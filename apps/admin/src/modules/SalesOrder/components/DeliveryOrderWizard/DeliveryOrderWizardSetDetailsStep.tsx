import React, { FC } from 'react'
import { StepWizardChildProps } from 'react-step-wizard'
import { Control, FieldValues, UseFormWatch } from 'react-hook-form'
import { Box, Grid } from '@gravis-os/ui'
import { Typography } from '@mui/material'
import { ControlledModelField, ModelFieldProps } from '@gravis-os/form'
import {
  ControlledDateTimeField,
  ControlledTextField,
  TextField,
} from '@gravis-os/fields'
import { userModule } from '@admin/modules/User/userConfig'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { DRIVER_ROLE } from '@admin/modules/Role/constants'

interface DeliveryOrderWizardSetDetailsStepProps
  extends Partial<StepWizardChildProps> {
  control: Control
  setValue: ModelFieldProps['setValue']
  watch: UseFormWatch<FieldValues>
}

const DeliveryOrderWizardSetDetailsStep: FC<
  DeliveryOrderWizardSetDetailsStepProps
> = (props) => {
  const { control, setValue, watch } = props

  const driver = watch('driver') || {}

  return (
    <Box sx={{ p: 2.5 }}>
      <Typography sx={{ my: 4 }}>
        Please assign a driver for this delivery.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ControlledModelField
            module={userModule}
            control={control}
            name="driver"
            label="Driver"
            setValue={setValue}
            select="id, title, full_name, role!inner(*)"
            setQuery={async ({ select }) =>
              supabaseClient
                .from(userModule.table.name)
                .select(select)
                .match({ 'role.type': DRIVER_ROLE })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={driver.mobile || ''}
            label="Driver Contact"
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledDateTimeField
            control={control}
            name="delivery_at"
            label="Delivery Date"
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextField
            control={control}
            name="vehicle_number"
            label="Vehicle Number"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default DeliveryOrderWizardSetDetailsStep
