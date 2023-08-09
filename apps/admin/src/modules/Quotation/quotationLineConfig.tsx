import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import { quotationModule } from '@admin/modules/Quotation/quotationModule'
import productModule from '../Product/productModule'
import { QuotationLineProductPrices } from './components'

export const quotationLineFormSections = [
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
        key: 'quotation_id',
        name: 'quotation_id',
        type: 'model',
        module: quotationModule,
        required: true,
      },
      { key: 'title', name: 'title', type: 'input', required: true },
      { key: 'subtitle', name: 'subtitle', type: 'input' },
      { key: 'quantity', name: 'quantity', type: 'input' },
      { key: 'unit_price', name: 'unit_price', type: 'amount' },
    ],
  },
]

export const quotationLinePreviewFormSections = quotationLineFormSections

export const quotationLineColumnDefs = [{ field: 'title' }]
