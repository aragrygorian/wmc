import React from 'react'
import useUser from '@admin/app/useUser'
import { DataTable, useGetItem } from '@gravis-os/crud'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useQuery } from 'react-query'
import { Link } from '@mui/material'
import dayjs from 'dayjs'
import { CheckBox } from '@mui/icons-material'
import { ProgressiveClaimLine } from '../../ProgressiveClaim/types'
import DialogButton from '../../../components/DialogButton'
import { progressiveClaimLineModule } from '../../ProgressiveClaim/progressiveClaimLineConfig'
import getProgressiveClaimBalanceFromSalesOrderLine from '../utils/getProgressiveClaimBalanceFromSalesOrderLine'
import { SalesOrder, SalesOrderLine } from '../types'
import { salesOrderModule } from '../salesOrderConfig'

interface SalesOrderLineProgressiveClaimBalanceProps {
  salesOrderLine: SalesOrderLine
}

const SalesOrderLineProgressiveClaimBalance: React.FC<
  SalesOrderLineProgressiveClaimBalanceProps
> = (props) => {
  const { salesOrderLine } = props
  const { id, product_id, quantity } = salesOrderLine || {}
  const { user } = useUser()
  const progressiveClaimBalance =
    getProgressiveClaimBalanceFromSalesOrderLine(salesOrderLine)
  const isZeroBalance = progressiveClaimBalance <= 0
  const hasProgressiveClaim = progressiveClaimBalance < quantity

  const tableName = progressiveClaimLineModule.table.name
  const selector = progressiveClaimLineModule.select.list
  const matcher = { sales_order_line_id: id }
  const { data: progressiveClaimLines } = useQuery({
    queryKey: [tableName, selector, matcher],
    queryFn: async () => {
      const { data: progressiveClaimLines } = await supabaseClient
        .from<ProgressiveClaimLine>(tableName)
        .select(selector)
        .match(matcher)
      return progressiveClaimLines
    },
    enabled: Boolean(user) && !isZeroBalance && hasProgressiveClaim,
  })

  const { item: salesOrder } = useGetItem({ module: salesOrderModule })
  const deliveryOrders = (salesOrder as SalesOrder)?.delivery_order?.filter(
    ({ lines }) => lines?.some((line) => line.product_id === product_id)
  )

  if (isZeroBalance) return <CheckBox color="success" />
  if (!hasProgressiveClaim) return <div>{quantity}</div>

  return (
    <DialogButton
      title="View PC Reference"
      disableActions
      renderTrigger={({ onClick }) => (
        <Link
          underline="always"
          sx={{ ':hover': { cursor: 'pointer' } }}
          onClick={onClick}
        >
          {progressiveClaimBalance}
        </Link>
      )}
    >
      <DataTable
        rowData={progressiveClaimLines}
        columnDefs={[
          { field: 'progressive_claim.title', headerName: 'PC ID' },
          {
            field: 'product.model_code',
            headerName: 'Model Code',
            valueFormatter: ({ value }) => value && `#${value}`,
          },
          { field: 'product.title', headerName: 'Product Name', minWidth: 500 },
          {
            field: 'progressive_claim.claim_at',
            headerName: 'Claim Date',
            valueFormatter: ({ value }) =>
              value && dayjs(value).format('DD MMM YYYY'),
          },
          {
            field: 'delivery_orders',
            headerName: 'DO Ref',
            minWidth: 160,
            valueGetter: () =>
              deliveryOrders?.map(({ title }) => title).join(', '),
          },
          { field: 'quantity', headerName: 'Claim Qty' },
          { field: 'approved_quantity', headerName: 'App Qty' },
        ]}
      />
    </DialogButton>
  )
}

export default SalesOrderLineProgressiveClaimBalance
