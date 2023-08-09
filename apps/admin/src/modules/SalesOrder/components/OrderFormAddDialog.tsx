import React, { useRef, useState } from 'react'
import { useCreateMutation } from '@gravis-os/crud'
import { AgGridReact } from 'ag-grid-react'
import { first, kebabCase } from 'lodash'
import { Company } from '@prisma/client'
import { Dayjs } from 'dayjs'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { getDocumentTitle } from '@gravis-os/apps/accounting'
import { useUser } from '@gravis-os/auth'
import { StepWizardChildProps, StepWizardProps } from 'react-step-wizard'
import { Button } from '@mui/material'
import { orderFormModule } from '../../OrderForm/orderFormConfig'
import { orderFormLineModule } from '../../OrderForm/orderFormLineConfig'
import DialogButton from '../../../components/DialogButton'
import { SalesOrder, SalesOrderLine } from '../types'
import { OrderForm, OrderFormLine } from '../../OrderForm/types'
import OrderFormWizardSelectItemsStep from './OrderFormWizard/OrderFormWizardSelectItemsStep'
import OrderFormWizardSetDateStep from './OrderFormWizard/OrderFormWizardSetDateStep'
import OrderFormWizardSuccessStep from './OrderFormWizard/OrderFormWizardSuccessStep'
import OrderFormWizard from './OrderFormWizard'

interface OrderFormAddDialogProps {
  salesOrder: SalesOrder
  salesOrderLines: SalesOrderLine[]
  disabled?: boolean
}

const OrderFormAddDialog: React.FC<OrderFormAddDialogProps> = (props) => {
  const { salesOrder, salesOrderLines, disabled } = props
  const { user } = useUser()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderForms, setOrderForms] = useState<OrderForm[]>([])
  const { createMutation: createOrderFormMutation } =
    useCreateMutation<OrderForm>({
      module: orderFormModule,
    })
  const { createMutation: createOrderFormLineMutation } =
    useCreateMutation<OrderFormLine>({
      module: orderFormLineModule,
    })

  const handleCreateOrderForms = async () => {
    const orderFormInputs = getItemsWithSetDate()
    try {
      setIsSubmitting(true)
      const { count } = await supabaseClient
        .from(orderFormModule.table.name)
        .select('*', { count: 'exact', head: true })
      const orderForms = await Promise.all(
        orderFormInputs.map(async (orderFormInput, index) => {
          const { company, lines, date } = orderFormInput
          const title = getDocumentTitle({
            prefix: 'OF',
            year: null,
            counter: (count ?? 0) + index + 1,
            version: null,
          })
          const { data, error } = await createOrderFormMutation.mutateAsync({
            assignee_id: user?.id,
            created_by: user?.id,
            updated_by: user?.id,
            title,
            slug: kebabCase(title),
            due_at: date.toISOString(),
            company_id: company.id,
            sales_order_id: salesOrder.id,
            status: 'New',
          })
          const orderForm: OrderForm | undefined = first(data)

          if (!orderForm || error) throw error

          await Promise.all([
            ...lines.map(({ title, slug, note, quantity, product_id }, index) =>
              createOrderFormLineMutation.mutateAsync({
                created_by: user?.id,
                updated_by: user?.id,
                position: index + 1,
                title,
                slug,
                note,
                quantity,
                order_form_id: orderForm.id,
                product_id,
              })
            ),
          ])
          return orderForm
        })
      )
      setOrderForms(orderForms)
      wizard?.nextStep()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Wizard props
  const [wizard, setWizard] =
    useState<
      Pick<StepWizardChildProps, 'firstStep' | 'nextStep' | 'previousStep'>
    >()
  const [step, setStep] = useState(1)
  const handleNext = () => wizard?.nextStep()
  const handleBack = () => wizard?.previousStep()
  const handleStepChange: StepWizardProps['onStepChange'] = ({ activeStep }) =>
    setStep(activeStep)

  // Wizard Select Items Step
  const selectItemsStepRef = useRef<AgGridReact>(null)
  const getSelectedItems = () => {
    const data: SalesOrderLine[] = []
    selectItemsStepRef.current?.api?.forEachNode((rowNode) =>
      data.push(rowNode.data)
    )
    return data
  }

  // Wizard Set Date Step
  const setDateStepRef = useRef<AgGridReact>(null)
  const getItemsWithSetDate = () => {
    const data: Array<{
      company: Company
      lines: SalesOrderLine[]
      date: Dayjs
    }> = []
    setDateStepRef.current?.api?.forEachNode((rowNode) =>
      data.push(rowNode.data)
    )
    return data
  }

  const renderActions = ({ onClose }) => {
    const onBack = step > 1 ? handleBack : onClose
    const onNext = step < 2 ? handleNext : handleCreateOrderForms
    if (step > 2) return null
    return (
      <>
        <Button color="inherit" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button variant="contained" onClick={onNext} disabled={isSubmitting}>
          {step < 2 ? 'Continue' : 'Add'}
        </Button>
      </>
    )
  }

  const handleClose = () => {
    setOrderForms([])
    setStep(1)
  }

  return (
    <DialogButton
      title="Add Order Form"
      buttonProps={{ disabled }}
      renderActions={renderActions}
      onClose={handleClose}
    >
      <OrderFormWizard instance={setWizard} onStepChange={handleStepChange}>
        <OrderFormWizardSelectItemsStep
          items={salesOrderLines}
          ref={selectItemsStepRef}
        />
        <OrderFormWizardSetDateStep
          items={getSelectedItems()}
          ref={setDateStepRef}
        />
        <OrderFormWizardSuccessStep
          orderForms={orderForms}
          salesOrder={salesOrder}
          items={getItemsWithSetDate()}
        />
      </OrderFormWizard>
    </DialogButton>
  )
}

export default OrderFormAddDialog
