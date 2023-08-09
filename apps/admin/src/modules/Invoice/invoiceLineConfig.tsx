import React from 'react'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import productModule from '../Product/productModule'
import { QuotationLineProductPrices } from '../Quotation/components'
import invoiceModule from './invoiceModule'

export const invoiceFormSections = [
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
        key: 'invoice_id',
        name: 'invoice_id',
        type: 'model',
        module: invoiceModule,
        required: true,
      },
      { key: 'title', name: 'title', type: 'input', required: true },
      { key: 'subtitle', name: 'subtitle', type: 'input' },
      { key: 'quantity', name: 'quantity', type: 'input' },
      { key: 'unit_price', name: 'unit_price', type: 'amount' },
    ],
  },
]

export const invoiceLineModule = {
  sk: 'slug',
  table: {
    name: 'invoice_line',
  },
  name: {
    singular: 'Invoice Line',
    plural: 'Invoice Lines',
  },
  select: {
    list: '*, invoice(*), product:product_id(*)',
    detail: '*, invoice(*)',
  },
  Icon: CategoryOutlinedIcon,
}

export const invoiceLinePreviewFormSections = invoiceFormSections

export const invoiceLineColumnDefs = [
  { field: 'product.model_code', headerName: 'Model Code' },
  { field: 'product.title', headerName: 'Product Name' },
  { field: 'note' },
  { field: 'quantity', headerName: 'Qty' },
  { field: 'unit_price', headerName: 'Unit Price ($)' },
  { field: 'discount_rate', headerName: 'Discount Rate' },
  { field: 'total' },
]
