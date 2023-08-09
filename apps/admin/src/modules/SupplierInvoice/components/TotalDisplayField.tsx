import React from 'react'
import { printAmount } from '@gravis-os/utils'
import { StatStack } from '@gravis-os/ui'
import { useFormContext, useWatch } from 'react-hook-form'

const TotalDisplayField = (props) => {
  const { formContext } = props
  const { control } = formContext
  const [total] = useWatch({ control, name: ['total'] })

  return (
    <StatStack
      items={[
        {
          key: 'total',
          title: `SGD ${printAmount(total)}`,
          overline: 'Amount Payable Due',
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
