import { Stack, Typography, TypographyProps } from '@gravis-os/ui'
import { StackProps } from '@mui/system'
import React from 'react'

export interface DeliveryOrderCreatedAtDisplayFieldProps {
  title: string
  overline: string
  stackProps?: StackProps
  titleProps?: TypographyProps
  overlineProps?: TypographyProps
}

const DeliveryOrderReadOnlyDisplayField: React.FC<
  DeliveryOrderCreatedAtDisplayFieldProps
> = (props): React.ReactElement => {
  const { title, overline, stackProps, titleProps, overlineProps, ...rest } =
    props
  return (
    <Stack spacing={0.5} {...stackProps} {...rest}>
      <Typography variant="overline" color="text.secondary" {...overlineProps}>
        {overline}
      </Typography>
      <Typography variant="subtitle1" {...titleProps}>
        {title ?? '-'}
      </Typography>
    </Stack>
  )
}

export default DeliveryOrderReadOnlyDisplayField
