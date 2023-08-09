import React from 'react'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import { ColDef } from 'ag-grid-community'
import { sumBy } from 'lodash'
import productModule from '../Product/productModule'
import { QuotationLineProductPrices } from '../Quotation/components'
import purchaseOrderModule from './purchaseOrderModule'
import { PurchaseOrderLine } from './types'
import { orderFormModule } from '../OrderForm/orderFormConfig'
import ModuleLink from '../../components/ModuleLink'

export const purchaseOrderFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up general details',
    icon: <BallotOutlinedIcon />,
    fields: [
      {
        key: 'product_id',
        name: 'product_id',
        type: 'model',
        module: productModule,
        required: true,
      },
      <QuotationLineProductPrices />,
      {
        key: 'purchase_order_id',
        name: 'purchase_order_id',
        type: 'model',
        module: purchaseOrderModule,
        required: true,
      },
      { key: 'title', name: 'title', type: 'input', required: true },
      { key: 'subtitle', name: 'subtitle', type: 'input' },
      { key: 'quantity', name: 'quantity', type: 'input' },
      { key: 'unit_price', name: 'unit_price', type: 'amount' },
    ],
  },
]

export const purchaseOrderLineModule = {
  sk: 'slug',
  table: {
    name: 'purchase_order_line',
  },
  name: {
    singular: 'Purchase Order Line',
    plural: 'Purchase Order Lines',
  },
  select: {
    list: '*, purchase_order(*), order_form_line:order_form_line_id(*, order_form(*)), product:product_id(*), inventory(*)',
    detail: '*, purchase_order(*), product:product_id(*)',
  },
  Icon: CategoryOutlinedIcon,
}

export const purchaseOrderLinePreviewFormSections = purchaseOrderFormSections

export const purchaseOrderLineColumnDefs: ColDef[] = [
  {
    colId: 'checkbox',
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
    minWidth: 325,
    field: 'product_id',
    headerName: 'Product Name',
    valueGetter: ({ data }) => data.product?.title,
  },
  {
    field: 'order_form_line.order_form.title',
    headerName: 'OF Ref',
    cellRenderer: ({ data }) => (
      <ModuleLink
        module={orderFormModule}
        item={data.order_form_line?.order_form}
      />
    ),
  },
  {
    field: 'quantity',
    headerName: 'Ordered Qty',
    minWidth: 100,
  },
  {
    field: 'quantity',
    headerName: 'Bal',
    minWidth: 100,
    valueGetter: ({ data, getValue }) =>
      data.quantity - (getValue('arrived_quantity') || 0),
  },
  {
    field: 'arrived_quantity',
    headerName: 'Arrived Qty',
    minWidth: 100,
    valueGetter: ({ data }: { data: PurchaseOrderLine }) =>
      sumBy(data.inventory, 'in'),
  },
  {
    field: 'status',
    minWidth: 100,
  },
]
