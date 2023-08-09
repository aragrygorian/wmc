import React, { useRef, useState } from 'react'
import { useCreateMutation } from '@gravis-os/crud'
import { AgGridReact } from 'ag-grid-react'
import { first, omit, pick } from 'lodash'
import { useUser } from '@gravis-os/auth'
import { StepWizardChildProps, StepWizardProps } from 'react-step-wizard'
import { Button } from '@mui/material'
import { FieldValues, useForm } from 'react-hook-form'
import { deliveryOrderLineModule } from '../../DeliveryOrder/deliveryOrderLineConfig'
import { deliveryOrderModule } from '../../DeliveryOrder/deliveryOrderModule'
import { DeliveryOrder, DeliveryOrderLine } from '../../DeliveryOrder/types'
import DialogButton from '../../../components/DialogButton'
import { SalesOrder, SalesOrderLine } from '../types'
import DeliveryOrderWizardSelectItemsStep from './DeliveryOrderWizard/DeliveryOrderWizardSelectItemsStep'
import DeliveryOrderWizardSetDetailsStep from './DeliveryOrderWizard/DeliveryOrderWizardSetDetailsStep'
import DeliveryOrderWizardSuccessStep from './DeliveryOrderWizard/DeliveryOrderWizardSuccessStep'
import DeliveryOrderWizard from './DeliveryOrderWizard'

const defaultValues = {
  driver: null,
  driver_contact: '',
  vehicle_number: '',
  delivery_at: new Date(),
}

interface DeliveryOrderAddDialogProps {
  salesOrder: SalesOrder
  salesOrderLines: SalesOrderLine[]
  disabled?: boolean
}

const DeliveryOrderAddDialog: React.FC<DeliveryOrderAddDialogProps> = (
  props
) => {
  const { salesOrder, salesOrderLines, disabled } = props
  const { user } = useUser()

  const [deliveryOrder, setDeliveryOrder] = useState<DeliveryOrder | null>(null)
  const { createMutation: createDeliveryOrderMutation } =
    useCreateMutation<DeliveryOrder>({
      module: deliveryOrderModule,
    })
  const { createMutation: createDeliveryOrderLineMutation } =
    useCreateMutation<DeliveryOrderLine>({
      module: deliveryOrderLineModule,
    })

  const handleCreateDeliveryOrders = async (formValues) => {
    const items = getSelectedItems()
    try {
      const { data, error } = await createDeliveryOrderMutation.mutateAsync({
        ...pick(salesOrder, [
          'shipping_address_line_1',
          'shipping_address_line_2',
          'shipping_address_postal_code',
          'shipping_address_city',
          'shipping_address_country',
        ]),
        title: '',
        slug: '',
        assignee_id: user?.id,
        driver_id: formValues.driver?.id,
        created_by: user?.id,
        updated_by: user?.id,
        company_id: salesOrder?.company_id,
        contact_id: salesOrder?.contact_id,
        project_id: salesOrder?.project_id,
        sales_order_id: salesOrder.id,
        status: 'New',
        ...omit(formValues, ['driver']),
      })

      const deliveryOrder: DeliveryOrder | null = first(data) || null

      if (!deliveryOrder || error) throw error

      await Promise.all([
        ...items.map(
          (
            {
              title,
              slug,
              note,
              quantity,
              unit_price,
              product_id,
              location_code,
            },
            index
          ) =>
            createDeliveryOrderLineMutation.mutateAsync({
              created_by: user?.id,
              updated_by: user?.id,
              position: index + 1,
              title,
              slug,
              note,
              location_code,
              quantity,
              unit_price,
              product_id,
              delivery_order_id: deliveryOrder.id,
            })
        ),
      ])

      setDeliveryOrder(deliveryOrder)
      wizard?.nextStep()
    } catch (error) {
      console.error(error)
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

  // Wizard Select Details Step
  const { control, handleSubmit, reset, formState, setValue, watch } =
    useForm<FieldValues>({
      defaultValues,
    })
  const { isSubmitting } = formState

  const renderActions = ({ onClose }) => {
    const onBack = step > 1 ? handleBack : onClose
    const onNext =
      step < 2 ? handleNext : handleSubmit(handleCreateDeliveryOrders)
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
    setDeliveryOrder(null)
    setStep(1)
    reset(defaultValues)
  }

  return (
    <DialogButton
      title="Add Delivery Order"
      buttonProps={{ disabled }}
      renderActions={renderActions}
      onClose={handleClose}
    >
      <DeliveryOrderWizard instance={setWizard} onStepChange={handleStepChange}>
        <DeliveryOrderWizardSelectItemsStep
          items={salesOrderLines}
          ref={selectItemsStepRef}
        />
        <DeliveryOrderWizardSetDetailsStep
          control={control}
          setValue={setValue}
          watch={watch}
        />
        <DeliveryOrderWizardSuccessStep
          deliveryOrder={deliveryOrder}
          salesOrder={salesOrder}
        />
      </DeliveryOrderWizard>
    </DialogButton>
  )
}

export default DeliveryOrderAddDialog
