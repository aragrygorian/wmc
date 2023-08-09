import React from 'react'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { Stack, StackProps, Typography, TypographyProps } from '@gravis-os/ui'
import NextLink from 'next/link'
import { deliveryOrderModule } from '../../DeliveryOrder/deliveryOrderModule'

interface DeliveryOrderReferenceDisplayFieldProps {
  formContext?: UseFormReturn
  overline: string
  textProps?: TypographyProps
  stackProps?: StackProps
  name: string
}

const LinkDisplayField: React.FC<DeliveryOrderReferenceDisplayFieldProps> = (
  props
) => {
  const { formContext, name, overline, stackProps, textProps } = props
  const { control } = formContext || {}
  const [model] = useWatch({ control, name: [name] })
  const { title, [deliveryOrderModule.sk]: slug } = model || {}

  return (
    <Stack spacing={0.5} {...stackProps}>
      <Typography variant="overline" color="text.secondary">
        {overline}
      </Typography>
      <NextLink href={`${deliveryOrderModule.route.plural}/${slug}`}>
        <Typography
          variant="subtitle1"
          {...textProps}
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            textDecoration: 'underline',
            ...textProps?.sx,
          }}
        >
          {title}
        </Typography>
      </NextLink>
    </Stack>
  )
}

export default LinkDisplayField
