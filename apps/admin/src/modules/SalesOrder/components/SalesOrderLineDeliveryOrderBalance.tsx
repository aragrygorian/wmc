import React from 'react'
import useUser from '@admin/app/useUser'
import { DataTable } from '@gravis-os/crud'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useQuery } from 'react-query'
import { Link } from '@mui/material'
import { CheckBox } from '@mui/icons-material'
import DialogButton from '../../../components/DialogButton'
import { DeliveryOrderLine } from '../../DeliveryOrder/types'
import { deliveryOrderLineModule } from '../../DeliveryOrder/deliveryOrderLineConfig'
import getDeliveryOrderBalanceFromSalesOrderLine from '../utils/getDeliveryOrderBalanceFromSalesOrderLine'
import { SalesOrderLine } from '../types'

interface SalesOrderLineDeliveryOrderBalanceProps {
  salesOrderLine: SalesOrderLine
}

const SalesOrderLineDeliveryOrderBalance: React.FC<
  SalesOrderLineDeliveryOrderBalanceProps
> = (props) => {
  const { salesOrderLine } = props
  const { quantity, sales_order_id } = salesOrderLine || {}
  const { user } = useUser()
  const deliveryOrderBalance =
    getDeliveryOrderBalanceFromSalesOrderLine(salesOrderLine)
  const isZeroBalance = deliveryOrderBalance <= 0
  const hasDeliveryOrder = deliveryOrderBalance < quantity

  const tableName = deliveryOrderLineModule.table.name
  const selector = deliveryOrderLineModule.select.list
  const matcher = { 'delivery_order.sales_order_id': sales_order_id }
  const { data: deliveryOrderLines } = useQuery({
    queryKey: [tableName, selector, matcher],
    queryFn: async () => {
      const { data: deliveryOrderLines } = await supabaseClient
        .from<DeliveryOrderLine>(tableName)
        .select(selector)
        .match(matcher)
      return deliveryOrderLines
    },
    enabled: Boolean(user) && !isZeroBalance && hasDeliveryOrder,
  })

  if (isZeroBalance) return <CheckBox color="success" />
  if (!hasDeliveryOrder) return <div>{quantity}</div>

  return (
    <DialogButton
      title="View DO Reference"
      disableActions
      renderTrigger={({ onClick }) => (
        <Link
          underline="always"
          sx={{ ':hover': { cursor: 'pointer' } }}
          onClick={onClick}
        >
          {deliveryOrderBalance}
        </Link>
      )}
    >
      <DataTable
        rowData={deliveryOrderLines}
        columnDefs={[
          { field: 'delivery_order.title', headerName: 'DO ID' },
          {
            field: 'product.model_code',
            headerName: 'Model Code',
            valueFormatter: ({ value }) => value && `#${value}`,
          },
          { field: 'product.title', headerName: 'Product Name', minWidth: 500 },
          {
            field: 'quantity',
            headerName: 'Qty to Deliver',
          },
          {
            field: 'quantity',
            headerName: 'Delivered Qty',
            valueGetter: () => 0,
          },
        ]}
      />
    </DialogButton>
  )
}

export default SalesOrderLineDeliveryOrderBalance
