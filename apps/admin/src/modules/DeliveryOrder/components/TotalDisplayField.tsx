import React from 'react'
import { printAmount } from '@gravis-os/utils'
import { StatStack } from '@gravis-os/ui'
import { useFormContext, useWatch } from 'react-hook-form'
import { sumBy } from 'lodash'
import { DeliveryOrderLine } from '../types'

const TotalDisplayField = (props) => {
  const { formContext } = props
  const { control } = formContext

  const [lines] = useWatch({
    control,
    name: ['lines'],
  })

  const total = sumBy(
    lines,
    ({ unit_price: unitPrice, quantity }: DeliveryOrderLine) =>
      (unitPrice ?? 1) * quantity
  )

  return (
    <StatStack
      items={[
        {
          key: 'total',
          title: `SGD ${printAmount(total)}`,
          overline: 'Amount (Excludes Shipping & Tax)',
        },
      ]}
      size="large"
      titleTypographyProps={{ variant: 'h1' }}
      justifyContent="flex-end"
      sx={{ textAlign: 'right' }}
    />
  )
}

export default TotalDisplayField
