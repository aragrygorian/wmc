import React from 'react'
import { DataTable } from '@gravis-os/crud'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import { Link } from '@mui/material'
import { useQuery } from 'react-query'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { sumBy } from 'lodash'
import { ColDef } from 'ag-grid-community'
import StatusCell from '@admin/components/StatusCell'
import OrderFormLineReserveDialogButton from '@admin/modules/OrderForm/components/OrderFormLineReserveDialogButton'
import OrderFormLineUnreserveDialogButton from '@admin/modules/OrderForm/components/OrderFormLineUnreserveDialogButton'
import { MoreIconButton } from '@gravis-os/ui'
import getOrderFormLineStatusColor from './utils/getOrderFormLineStatusColor'
import DialogButton from '../../components/DialogButton'
import { warehouseProductModule } from '../Warehouse/warehouseProductConfig'
import { WarehouseProduct } from '../Warehouse/types'
import { PurchaseOrderLine } from '../PurchaseOrder/types'
import { OrderFormLine } from './types'
import { getOrderFormLineBalance } from './utils/getOrderFormLineBalance'
import purchaseOrderModule from '../PurchaseOrder/purchaseOrderModule'
import ModuleLink from '../../components/ModuleLink'

export const orderFormLineFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up general info',
    icon: <BallotOutlinedIcon />,
    fields: [
      { key: 'title', name: 'title', type: 'input', required: true },
      { key: 'description', name: 'description', type: 'input' },
    ],
  },
]

export const orderFormLineModule = {
  sk: 'slug',
  table: {
    name: 'order_form_line',
  },
  name: {
    singular: 'Order Form Line',
    plural: 'Order Form Lines',
  },
  select: {
    list: '*, order_form(*), product(*)',
  },
  Icon: ReceiptOutlinedIcon,
}

export const orderFormLineColumnDefs: ColDef[] = [
  {
    field: 'checkbox',
    pinned: 'left',
    headerName: '',
    maxWidth: 50,
    checkboxSelection: true,
    suppressMenu: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
  },
  {
    field: 'product.model_code',
    headerName: 'Model Code',
    minWidth: 120,
    maxWidth: 120,
    valueFormatter: ({ value }) => value && `#${value}`,
  },
  {
    field: 'product.title',
    headerName: 'Product Name',
    cellStyle: {
      'white-space': 'nowrap',
      overflow: 'scroll',
    },
  },
  { field: 'quantity', headerName: 'Qty', minWidth: 70, maxWidth: 70 },
  {
    field: 'quantity',
    headerName: 'Bal',
    minWidth: 70,
    maxWidth: 70,
    valueGetter: ({ data }) => getOrderFormLineBalance(data),
  },
  {
    field: 'inventory',
    headerName: 'Inv',
    minWidth: 70,
    maxWidth: 70,
    cellRenderer: ({ data }) => {
      const { product_id } = data as OrderFormLine
      const matcher = { product_id }
      const { data: warehouseProducts } = useQuery({
        queryKey: [
          warehouseProductModule.table.name,
          warehouseProductModule.select.list,
          matcher,
        ],
        queryFn: async () => {
          const { data: warehouseProducts } = await supabaseClient
            .from<WarehouseProduct>(warehouseProductModule.table.name)
            .select(warehouseProductModule.select.list)
            .match(matcher)
          return warehouseProducts
        },
      })
      return sumBy(warehouseProducts, ({ inventory }) =>
        sumBy(inventory, ({ in: inbound, out: outbound }) => inbound - outbound)
      )
    },
  },
  {
    field: 'po_otw',
    headerName: 'PO OTW',
    minWidth: 70,
    maxWidth: 70,
    valueGetter: ({ data }) => {
      const purchaseOrderLine = data
        .purchase_order_line?.[0] as PurchaseOrderLine
      return (
        (purchaseOrderLine?.quantity || 0) -
        sumBy(purchaseOrderLine?.inventory, 'in')
      )
    },
  },
  {
    field: 'po_arrived',
    headerName: 'PO Arrived',
    minWidth: 100,
    maxWidth: 100,
    valueGetter: ({ data }) => {
      const purchaseOrderLine = data
        .purchase_order_line?.[0] as PurchaseOrderLine
      return sumBy(purchaseOrderLine?.inventory, 'in')
    },
  },
  {
    field: 'reserved',
    minWidth: 100,
    maxWidth: 100,
    valueGetter: ({ data }) =>
      sumBy(data.reservation, 'in') - sumBy(data.reservation, 'out'),
    cellRenderer: ({ data, value }) => {
      if (!value) return value
      const { reservation, product } = data
      const reservations = reservation.map((reservation) => ({
        ...reservation,
        product,
      }))
      return (
        <DialogButton
          title="View Reserved Reference"
          disableActions
          renderTrigger={({ onClick }) => (
            <Link
              underline="always"
              sx={{ ':hover': { cursor: 'pointer' } }}
              onClick={onClick}
            >
              {value}
            </Link>
          )}
        >
          <DataTable
            rowData={reservations}
            columnDefs={[
              {
                field: 'product.model_code',
                headerName: 'Model Code',
                maxWidth: 150,
              },
              { field: 'product.title', headerName: 'Product Name' },
              { field: 'quantity', headerName: 'Reserved', maxWidth: 150 },
              {
                field: 'warehouse_product.warehouse.title',
                headerName: 'Location',
                maxWidth: 200,
              },
            ]}
          />
        </DialogButton>
      )
    },
  },
  {
    field: 'po_reference',
    headerName: 'PO Ref',
    minWidth: 100,
    valueGetter: ({ data }) =>
      data.purchase_order_line?.[0]?.purchase_order?.title,
    cellRenderer: ({ data }) => (
      <ModuleLink
        module={purchaseOrderModule}
        item={data.purchase_order_line?.[0]?.purchase_order}
      />
    ),
  },
  {
    field: 'status',
    pinned: 'right',
    maxWidth: 150,
    cellRenderer: ({ value }) => (
      <StatusCell color={getOrderFormLineStatusColor(value)} label={value} />
    ),
  },
  {
    field: 'actions',
    pinned: 'right',
    editable: false,
    sortable: false,
    suppressMenu: true,
    maxWidth: 125,
    cellRenderer: ({ data }) => {
      const reserved =
        sumBy(data.reservation, 'in') - sumBy(data.reservation, 'out')

      const balance = getOrderFormLineBalance(data)

      return (
        <MoreIconButton size="small">
          {() => (
            <>
              <OrderFormLineReserveDialogButton
                disabled={balance <= 0}
                orderFormLine={data}
              />
              <OrderFormLineUnreserveDialogButton
                disabled={reserved <= 0}
                orderFormLine={data}
              />
            </>
          )}
        </MoreIconButton>
      )
    },
  },
]

export const orderFormLinePreviewFormSections = orderFormLineFormSections
export const orderFormLineAddFormSections = orderFormLineFormSections
