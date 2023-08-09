import React, { useState } from 'react'
import useUser from '@admin/app/useUser'
import { DataTable } from '@gravis-os/crud'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { sumBy } from 'lodash'
import { useQuery } from 'react-query'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Slide,
  Stack,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import dayjs from 'dayjs'
import { CheckBox } from '@mui/icons-material'
import { PurchaseOrderLine } from '../../PurchaseOrder/types'
import { OrderFormLine } from '../../OrderForm/types'
import { orderFormLineModule } from '../../OrderForm/orderFormLineConfig'
import getOrderFormBalanceFromSalesOrderLine from '../utils/getOrderFormBalanceFromSalesOrderLine'
import { SalesOrderLine } from '../types'

interface SalesOrderLineOrderFormBalanceProps {
  salesOrderLine: SalesOrderLine
}

const SalesOrderLineOrderFormBalance: React.FC<
  SalesOrderLineOrderFormBalanceProps
> = (props) => {
  const { salesOrderLine } = props
  const { sales_order_id, product_id, quantity } = salesOrderLine || {}
  const { user } = useUser()
  const orderFormBalance = getOrderFormBalanceFromSalesOrderLine(salesOrderLine)
  const isZeroBalance = orderFormBalance <= 0
  const hasOrderForm = orderFormBalance < quantity

  const tableName = orderFormLineModule.table.name
  const selector = `*, 
    order_form!inner(*), 
    product:product_id(*), 
    purchase_order_line!order_form_line_id(*, 
      purchase_order(*),
      inventory(*)
    )`
  const matcher = { product_id, 'order_form.sales_order_id': sales_order_id }
  const { data: orderFormLines } = useQuery({
    queryKey: [tableName, selector, matcher],
    queryFn: async () => {
      const { data: orderFormLines } = await supabaseClient
        .from<OrderFormLine>(tableName)
        .select(selector)
        .match(matcher)
      return orderFormLines
    },
    enabled: Boolean(user) && !isZeroBalance && hasOrderForm,
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  if (isZeroBalance) return <CheckBox color="success" />
  if (!hasOrderForm) return <div>{quantity}</div>

  return (
    <>
      <Link
        underline="always"
        sx={{ ':hover': { cursor: 'pointer' } }}
        onClick={handleOpen}
      >
        {orderFormBalance}
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' } as TransitionProps}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          pr={2}
        >
          <DialogTitle>View OF Reference</DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <DialogContent>
          <DataTable
            height={500}
            rowData={orderFormLines}
            columnDefs={[
              { field: 'order_form.title', headerName: 'OF ID' },
              {
                field: 'product.model_code',
                headerName: 'Model Code',
                valueFormatter: ({ value }) => value && `#${value}`,
              },
              {
                field: 'product.title',
                headerName: 'Product Name',
                minWidth: 500,
              },
              {
                field: 'order_form.due_at',
                headerName: 'Date Required',
                valueGetter: ({ data }) =>
                  data.order_form.due_at &&
                  dayjs(data.order_form.due_at).format('DD MMM YYYY'),
              },
              {
                field: 'purchase_order',
                headerName: 'PO Ref',
                valueGetter: ({ data }) =>
                  data.purchase_order_line?.[0]?.purchase_order.title,
              },
              {
                field: 'purchase_order_id',
                headerName: 'Delivery Date',
                valueGetter: () => '-',
              },
              { field: 'quantity', headerName: 'Ordered Qty' },
              {
                field: 'arrived_quantity',
                headerName: 'Arrived Qty',
                valueGetter: ({ data }: { data: OrderFormLine }) =>
                  sumBy(
                    data.purchase_order_line as PurchaseOrderLine[],
                    ({ inventory }) => sumBy(inventory, 'in')
                  ),
              },
              { field: 'status' },
            ]}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SalesOrderLineOrderFormBalance
