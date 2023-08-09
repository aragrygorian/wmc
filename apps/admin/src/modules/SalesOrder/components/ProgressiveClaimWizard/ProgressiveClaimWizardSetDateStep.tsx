import React from 'react'
import { StepWizardChildProps } from 'react-step-wizard'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { DateField } from '@gravis-os/fields'
import { Stack, Typography } from '@mui/material'

interface ProgressiveClaimWizardSetDateStepProps
  extends Partial<StepWizardChildProps> {
  control: Control
  errors: FieldErrors
}

const ProgressiveClaimWizardSetDateStep: React.FC<
  ProgressiveClaimWizardSetDateStepProps
> = (props) => {
  const { control, errors } = props

  return (
    <Stack spacing={2} p={2.5}>
      <Typography>
        Please set an estimated date for the progressive claim to be submitted.
      </Typography>
      <Controller
        name="claim_at"
        control={control}
        render={({ field }) => (
          <DateField
            label="Date"
            error={Boolean(errors.claim_at)}
            helperText={errors.claim_at?.message?.toString()}
            {...field}
          />
        )}
      />
    </Stack>
  )
}

export default ProgressiveClaimWizardSetDateStep
