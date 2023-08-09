import React from 'react'
import { Stack, TextField, Typography } from '@mui/material'
import { first, sumBy } from 'lodash'
import { useQueryClient } from 'react-query'
import { printAmount, printPercentage } from '@gravis-os/utils'
import { useWatch } from 'react-hook-form'
import { ProgressiveClaim } from '../types'
import { SalesOrder } from '../../SalesOrder/types'
import getProgressiveClaimLineTotal from '../utils/getProgressiveClaimLineTotal'
import { RETENTION_RATE } from './ProgressiveClaimStats'
import progressiveClaimModule from '../progressiveClaimModule'
import getSalesOrderLineTotal from '../../SalesOrder/utils/getSalesOrderLineTotal'

const ProgressiveClaimCustomPricingField = (props) => {
  const { item, isReadOnly, name, label, control, ...rest } = props
  const {
    sales_order_id,
    sales_order: salesOrder,
    lines,
    tax_rate: taxRate,
  } = (item as ProgressiveClaim & { sales_order: SalesOrder }) || {}
  const queryClient = useQueryClient()
  const progressiveClaims = queryClient.getQueryData<ProgressiveClaim[]>([
    progressiveClaimModule.table.name,
    progressiveClaimModule.select.list,
    { sales_order_id },
  ])

  const [watchedLines, watchedTaxRate] = useWatch({
    control,
    name: ['lines', 'tax_rate'],
  })
  const nextLines = isReadOnly ? lines : watchedLines
  const nextTaxRate = isReadOnly ? taxRate : watchedTaxRate

  const subtotal = sumBy(nextLines, getProgressiveClaimLineTotal)
  const tax = subtotal * (nextTaxRate || 0)
  const retention = (subtotal + tax) * RETENTION_RATE
  const total = subtotal + tax - retention

  const previousClaimTotal = first(progressiveClaims)?.total
  const accumulatedSum =
    sumBy<ProgressiveClaim>(progressiveClaims, 'total') + total
  const contractSum = sumBy<SalesOrder['lines'][number]>(
    salesOrder?.lines,
    getSalesOrderLineTotal
  )
  const outstandingAmount = contractSum - accumulatedSum

  const progessiveClaimStats = {
    retention,
    contract_sum: contractSum,
    previous_payment: previousClaimTotal,
    balance_amount: outstandingAmount,
  }

  const format = name.endsWith('rate') ? printPercentage : printAmount
  const value = format(progessiveClaimStats[name])

  if (isReadOnly) {
    return (
      <Stack spacing={1}>
        <Stack
          spacing={0.5}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="overline" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="subtitle1">{value}</Typography>
        </Stack>
      </Stack>
    )
  }

  return <TextField value={value} label={label} {...rest} />
}

export default ProgressiveClaimCustomPricingField
