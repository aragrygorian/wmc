import React, { useEffect } from 'react'
import { printAmount } from '@gravis-os/utils'
import { useFormContext, useWatch } from 'react-hook-form'
import { Divider, Stack, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { first, sumBy } from 'lodash'
import { ProgressiveClaim } from '../types'
import progressiveClaimModule from '../progressiveClaimModule'
import getProgressiveClaimLineTotal from '../utils/getProgressiveClaimLineTotal'
import { SalesOrder } from '../../SalesOrder/types'
import { salesOrderModule } from '../../SalesOrder/salesOrderConfig'
import getSalesOrderLineTotal from '../../SalesOrder/utils/getSalesOrderLineTotal'

export const RETENTION_RATE = 0.1

const ProgressiveClaimStats: React.FC = () => {
  const { control, setValue } = useFormContext()
  const [lines, taxRate, salesOrderInput, createdAt] = useWatch({
    control,
    name: ['lines', 'tax_rate', 'sales_order_id', 'created_at'],
  })

  const progressiveClaimTableName = progressiveClaimModule.table.name
  const progressiveClaimSelector = progressiveClaimModule.select.list
  const progressiveClaimMatcher = { sales_order_id: salesOrderInput?.id }
  const { data: progressiveClaims } = useQuery({
    queryKey: [
      progressiveClaimTableName,
      progressiveClaimSelector,
      progressiveClaimMatcher,
    ],
    queryFn: async () => {
      const { data: progressiveClaims } = await supabaseClient
        .from<ProgressiveClaim>(progressiveClaimTableName)
        .select(progressiveClaimSelector)
        .match(progressiveClaimMatcher)
        .lt('created_at', createdAt)
        .order('created_at', { ascending: false })
      return progressiveClaims
    },
    enabled: Boolean(salesOrderInput?.id),
  })
  const salesOrderTableName = salesOrderModule.table.name
  const salesOrderSelector = salesOrderModule.select.detail
  const salesOrderMatcher = { id: salesOrderInput?.id }
  const { data: salesOrder } = useQuery({
    queryKey: [salesOrderTableName, salesOrderSelector, salesOrderMatcher],
    queryFn: async () => {
      const { data: salesOrder } = await supabaseClient
        .from<SalesOrder>(salesOrderTableName)
        .select(salesOrderSelector)
        .match(salesOrderMatcher)
        .single()
      return salesOrder
    },
    enabled: Boolean(salesOrderInput?.id),
  })

  const subtotal = sumBy(lines, getProgressiveClaimLineTotal)
  const tax = subtotal * (taxRate || 0)
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

  // Effects
  useEffect(() => {
    setValue('tax', tax)
  }, [tax])

  useEffect(() => {
    setValue('subtotal', subtotal)
  }, [subtotal])

  useEffect(() => {
    setValue('retention', retention)
    setValue('total', total)
  }, [retention, total])

  useEffect(() => {
    setValue('contract_sum', contractSum)
  }, [contractSum])

  useEffect(() => {
    setValue('previous_payment', previousClaimTotal)
  }, [previousClaimTotal])

  useEffect(() => {
    setValue('balance_amount', outstandingAmount)
  }, [outstandingAmount])

  return (
    <Stack spacing={5.25}>
      <Stack spacing={2} alignItems="flex-end">
        <Typography variant="subtitle2">Total Claim Amount</Typography>
        <Typography variant="h3" align="right">
          {printAmount(total)}
        </Typography>
        <div>
          <Divider />
          <Typography variant="caption" color="text.secondary" mt={1}>
            Outstanding Amount {printAmount(outstandingAmount)}
          </Typography>
        </div>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={4}>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Previous Claim
          </Typography>
          <Typography variant="subtitle1" align="right">
            {printAmount(previousClaimTotal)}
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Accumulated Sum
          </Typography>
          <Typography variant="subtitle1" align="right">
            {printAmount(accumulatedSum)}
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Original Contract Sum
          </Typography>
          <Typography variant="subtitle1" align="right">
            {printAmount(contractSum)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ProgressiveClaimStats
