import React, { FC } from 'react'
import { Stack, StackProps, Typography, TypographyProps } from '@gravis-os/ui'
import { useFormContext, UseFormReturn, useWatch } from 'react-hook-form'
import dayjs from 'dayjs'

interface CreatedAtDisplayFieldProps {
  formContext?: UseFormReturn
  overline: string
  textProps?: TypographyProps
  stackProps?: StackProps
}

// TODO: Abstract and add types
const CreatedAtDisplayField: FC<CreatedAtDisplayFieldProps> = (props) => {
  const { formContext, overline, stackProps, textProps } = props
  const { control } = formContext || {}
  const [created_at] = useWatch({ control, name: ['created_at'] })
  const createdAt = dayjs(created_at)
  return (
    <Stack spacing={1} {...stackProps}>
      <Typography variant="overline" color="text.secondary">
        {overline}
      </Typography>
      <Typography variant="h3" {...textProps}>
        {createdAt.format('DD MMM YYYY')}
      </Typography>
    </Stack>
  )
}

export default CreatedAtDisplayField
