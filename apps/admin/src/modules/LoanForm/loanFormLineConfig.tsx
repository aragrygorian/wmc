import React from 'react'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import productModule from '../Product/productModule'
import { QuotationLineProductPrices } from '../Quotation/components'
import { loanFormModule } from './loanFormConfig'

export const loanFormFormSections = [
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
        key: 'loan_form_id',
        name: 'loan_form_id',
        type: 'model',
        module: loanFormModule,
        required: true,
      },
      { key: 'title', name: 'title', type: 'input', required: true },
      { key: 'subtitle', name: 'subtitle', type: 'input' },
      { key: 'quantity', name: 'quantity', type: 'input' },
      { key: 'unit_price', name: 'unit_price', type: 'amount' },
    ],
  },
]

export const loanFormLineModule = {
  sk: 'slug',
  table: {
    name: 'loan_form_line',
  },
  name: {
    singular: 'Loan Form Line',
    plural: 'Loan Form Lines',
  },
  select: {
    list: '*, loan_form(*)',
    detail:
      '*, loan_form(*, project(*, project_brand!project_id(*), brand(*)))',
  },
  Icon: CategoryOutlinedIcon,
}

export const loanFormLinePreviewFormSections = loanFormFormSections

export const loanFormLineColumnDefs = [{ field: 'title' }]
