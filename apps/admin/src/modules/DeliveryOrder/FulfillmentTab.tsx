import React from 'react'
import { CrudTable } from '@gravis-os/crud'
import { DeliveryOrder } from '@prisma/client'
import { ColDef } from 'ag-grid-community'
import { deliveryOrderLineModule } from './deliveryOrderLineConfig'

interface FulfillmentTabProps {
  deliveryOrder: DeliveryOrder
}

export const deliveryOrderLineColumnDefs: ColDef[] = [
  {
    field: '',
    headerName: '',
    maxWidth: 50,
    checkboxSelection: ({ api, node }) =>
      api.getValue('order_form_balance', node) > 0,
    suppressMenu: true,
    headerCheckboxSelection: ({ api }) =>
      api
        .getRenderedNodes()
        .every((node) => api.getValue('order_form_balance', node) > 0),
    headerCheckboxSelectionFilteredOnly: true,
    sortable: false,
  },
  {
    field: 'product.model_code',
    headerName: 'Model Code',
    minWidth: 120,
    maxWidth: 120,
    valueFormatter: ({ value }) => value && `#${value}`,
  },
  { field: 'product.title', headerName: 'Product Name', minWidth: 300 },
  {
    field: 'delivery_order.sales_order.title',
    headerName: 'SO Ref',
    minWidth: 120,
    maxWidth: 120,
  },
  {
    field: 'quantity',
    headerName: 'Qty to Deliver',
    minWidth: 100,
    maxWidth: 100,
  },
  {
    field: 'quantity',
    headerName: 'Bal',
    minWidth: 100,
    maxWidth: 100,
    valueFormatter: ({ value }) => value,
    valueGetter: ({ data }) => data.quantity - (data?.delivered_quantity ?? 0),
  },
  {
    field: 'delivered_quantity',
    headerName: 'Delivered Qty',
    minWidth: 100,
    maxWidth: 100,
  },
  { field: 'status', headerName: 'Status', minWidth: 100, maxWidth: 100 },
  { field: 'actions', hide: true },
]

const FulfillmentTab: React.FC<FulfillmentTabProps> = (props) => {
  const { deliveryOrder } = props

  return (
    <CrudTable
      module={deliveryOrderLineModule}
      columnDefs={deliveryOrderLineColumnDefs}
      setQuery={(query) => query.eq('delivery_order_id', deliveryOrder.id)}
      disableAdd
      disableActions
    />
  )
}

export default FulfillmentTab
