import React from 'react'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import { ColDef } from 'ag-grid-community'
import productModule from '../Product/productModule'
import { QuotationLineProductPrices } from '../Quotation/components'
import { salesOrderModule } from './salesOrderConfig'
import SalesOrderLineOrderFormBalance from './components/SalesOrderLineOrderFormBalance'
import SalesOrderLineProgressiveClaimBalance from './components/SalesOrderLineProgressiveClaimBalance'
import SalesOrderLineDeliveryOrderBalance from './components/SalesOrderLineDeliveryOrderBalance'
import getOrderFormBalanceFromSalesOrderLine from './utils/getOrderFormBalanceFromSalesOrderLine'
import getDeliveryOrderBalanceFromSalesOrderLine from './utils/getDeliveryOrderBalanceFromSalesOrderLine'
import getProgressiveClaimBalanceFromSalesOrderLine from './utils/getProgressiveClaimBalanceFromSalesOrderLine'

export const salesOrderLineFormSections = [
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
        key: 'sales_order_id',
        name: 'sales_order_id',
        type: 'model',
        module: salesOrderModule,
        required: true,
      },
      { key: 'title', name: 'title', type: 'input', required: true },
      { key: 'subtitle', name: 'subtitle', type: 'input' },
      { key: 'quantity', name: 'quantity', type: 'input' },
      { key: 'unit_price', name: 'unit_price', type: 'amount' },
    ],
  },
]

export const salesOrderLineModule = {
  sk: 'slug',
  table: {
    name: 'sales_order_line',
  },
  name: {
    singular: 'Sales Order Line',
    plural: 'Sales Order Lines',
  },
  select: {
    list: `*,
      sales_order(*,
        company:company_id(*),
        delivery_order!sales_order_id(*,
          lines:delivery_order_line(*) 
        ),
        order_form!sales_order_id(*,
          lines:order_form_line(*)
        )
      ),
      product:product_id(*,
        brand(*, company:company_id(*))
      ),
      progressive_claim_line(*)`,
    detail: '*, sales_order(*, company:company_id(*)), product(*, brand(*))',
  },
  Icon: CategoryOutlinedIcon,
}

export const salesOrderLinePreviewFormSections = salesOrderLineFormSections
export const salesOrderLineAddFormSections = salesOrderLineFormSections

export const salesOrderLineColumnDefs: ColDef[] = [
  {
    field: '',
    headerName: '',
    maxWidth: 50,
    checkboxSelection: (params) => params.context.getCheckboxSelection(params),
    suppressMenu: true,
    headerCheckboxSelection: (params) => {
      const nodes = params.api.getRenderedNodes()

      return nodes.length
        ? nodes.every((node) =>
            params.context.getCheckboxSelection({ ...params, node })
          )
        : false
    },
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
  { field: 'product.title', headerName: 'Product Name', minWidth: 350 },
  {
    field: 'product.brand.title',
    headerName: 'Brand',
    minWidth: 120,
    maxWidth: 120,
  },
  { field: 'quantity', headerName: 'Qty', minWidth: 100, maxWidth: 100 },
  {
    field: 'order_form_balance',
    headerName: 'OF Bal',
    minWidth: 100,
    maxWidth: 100,
    valueGetter: ({ data }) => getOrderFormBalanceFromSalesOrderLine(data),
    cellRenderer: ({ data }) => (
      <SalesOrderLineOrderFormBalance salesOrderLine={data} />
    ),
  },
  {
    field: 'delivery_order_balance',
    headerName: 'DO Bal',
    minWidth: 100,
    maxWidth: 100,
    valueGetter: ({ data }) => getDeliveryOrderBalanceFromSalesOrderLine(data),
    cellRenderer: ({ data }) => (
      <SalesOrderLineDeliveryOrderBalance salesOrderLine={data} />
    ),
  },
  {
    field: 'progressive_claim_balance',
    headerName: 'PC Bal',
    minWidth: 100,
    maxWidth: 100,
    valueGetter: ({ data }) =>
      getProgressiveClaimBalanceFromSalesOrderLine(data),
    cellRenderer: ({ data }) => (
      <SalesOrderLineProgressiveClaimBalance salesOrderLine={data} />
    ),
  },
  { field: 'actions', hide: true },
]
