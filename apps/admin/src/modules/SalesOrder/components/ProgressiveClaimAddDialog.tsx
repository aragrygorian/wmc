import React, { useState } from 'react'
import { useCreateMutation } from '@gravis-os/crud'
import { Button } from '@mui/material'
import { FieldValues, useForm } from 'react-hook-form'
import { useUser } from '@gravis-os/auth'
import { first, kebabCase, sumBy } from 'lodash'
import { commonConfig } from '@common/config'
import { useQuery, useQueryClient } from 'react-query'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { getDocumentTitle } from '@gravis-os/apps/accounting'
import { StepWizardChildProps, StepWizardProps } from 'react-step-wizard'
import DialogButton from '../../../components/DialogButton'
import { ProgressiveClaim } from '../../ProgressiveClaim/types'
import { SalesOrder, SalesOrderLine } from '../types'
import progressiveClaimModule from '../../ProgressiveClaim/progressiveClaimModule'
import { progressiveClaimLineModule } from '../../ProgressiveClaim/progressiveClaimLineConfig'
import getProgressiveClaimLineTotal from '../../ProgressiveClaim/utils/getProgressiveClaimLineTotal'
import ProgressiveClaimWizard from './ProgressiveClaimWizard'
import ProgressiveClaimWizardSuccessStep from './ProgressiveClaimWizard/ProgressiveClaimWizardSuccessStep'
import ProgressiveClaimWizardSelectItemsStep from './ProgressiveClaimWizard/ProgressiveClaimWizardSelectItemsStep'
import ProgressiveClaimWizardSetDateStep from './ProgressiveClaimWizard/ProgressiveClaimWizardSetDateStep'

const defaultValues = {
  claim_at: new Date(),
}

interface ProgressiveClaimAddDialogProps {
  salesOrder: SalesOrder
  salesOrderLines: SalesOrderLine[]
  disabled?: boolean
}

const ProgressiveClaimAddDialog: React.FC<ProgressiveClaimAddDialogProps> = (
  props
) => {
  const { user } = useUser()
  const { salesOrder, salesOrderLines, disabled } = props
  const { project_id, company_id, contact_id, company } = salesOrder
  const {
    billing_address_line_1,
    billing_address_line_2,
    billing_address_postal_code,
    billing_address_city,
    billing_address_country,
  } = company || {}
  const { control, formState, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues,
  })
  const { errors, isSubmitting } = formState

  const { data: count } = useQuery({
    queryKey: [progressiveClaimModule.table.name, 'count'],
    queryFn: async () => {
      const { count } = await supabaseClient
        .from(progressiveClaimModule.table.name)
        .select('*', { count: 'exact', head: true })
      return count
    },
    enabled: Boolean(user),
  })
  const counter = (count ?? 0) + 1
  const defaultTitle = getDocumentTitle({
    prefix: 'PC',
    counter,
    version: null,
    year: null,
  })

  const [progressiveClaim, setProgressiveClaim] =
    useState<ProgressiveClaim | null>(null)
  const queryClient = useQueryClient()
  const { createMutation: createProgressiveClaimMutation } =
    useCreateMutation<ProgressiveClaim>({
      module: progressiveClaimModule,
      options: {
        onSuccess() {
          queryClient.invalidateQueries([progressiveClaimModule.table.name])
        },
      },
    })
  const { createMutation: createProgressiveClaimLineMutation } =
    useCreateMutation({
      module: progressiveClaimLineModule,
      options: {
        onSuccess() {
          queryClient.invalidateQueries([progressiveClaimModule.table.name])
        },
      },
    })

  const onSubmit = (onSuccess: VoidFunction) => async (values) => {
    try {
      const { claim_at, type } = values
      const progressiveClaimLines = (
        salesOrderLines as Array<SalesOrderLine & { claim_quantity?: number }>
      )?.map(
        ({
          id,
          position,
          claim_quantity,
          unit_price,
          location_code,
          product_id,
        }) => ({
          created_by: user?.id,
          updated_by: user?.id,
          position,
          quantity: claim_quantity,
          approved_quantity: 0,
          unit_price,
          location_code,
          product_id,
          sales_order_line_id: id,
        })
      )
      const subtotal = sumBy(
        progressiveClaimLines,
        getProgressiveClaimLineTotal
      )
      const tax_rate = commonConfig.taxRate
      const tax = subtotal * tax_rate
      const total = subtotal + tax
      const { data: progressiveClaims } =
        await createProgressiveClaimMutation.mutateAsync({
          title: defaultTitle,
          slug: kebabCase(defaultTitle),
          claim_at,
          type,
          subtotal,
          tax,
          tax_rate,
          total,
          billing_address_line_1,
          billing_address_line_2,
          billing_address_postal_code,
          billing_address_city,
          billing_address_country,
          project_id,
          company_id,
          contact_id,
          sales_order_id: salesOrder.id,
          user_id: user?.id,
        })
      const progressiveClaim: ProgressiveClaim | null =
        first(progressiveClaims) || null
      await Promise.all(
        progressiveClaimLines.map((line) =>
          createProgressiveClaimLineMutation.mutateAsync({
            ...line,
            progressive_claim_id: progressiveClaim?.id,
          })
        )
      )
      setProgressiveClaim(progressiveClaim)
      onSuccess()
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

  const renderActions = ({ onClose }) => {
    const onSuccess = () => wizard?.nextStep()
    const onBack = step > 1 ? handleBack : onClose
    const onNext = step < 2 ? handleNext : handleSubmit(onSubmit(onSuccess))
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
    setProgressiveClaim(null)
    setStep(1)
    reset(defaultValues)
  }

  return (
    <DialogButton
      title="Add Progressive Claim"
      buttonProps={{ disabled }}
      renderActions={renderActions}
      onClose={handleClose}
    >
      <ProgressiveClaimWizard
        instance={setWizard}
        onStepChange={handleStepChange}
      >
        <ProgressiveClaimWizardSelectItemsStep items={salesOrderLines} />
        <ProgressiveClaimWizardSetDateStep control={control} errors={errors} />
        <ProgressiveClaimWizardSuccessStep
          progressiveClaim={progressiveClaim}
          salesOrder={salesOrder}
        />
      </ProgressiveClaimWizard>
    </DialogButton>
  )
}

export default ProgressiveClaimAddDialog
