import React from 'react'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import productModule from '../Product/productModule'
import { QuotationLineProductPrices } from '../Quotation/components'
import { creditNoteModule } from './creditNoteConfig'

export const creditNoteFormSections = [
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
        key: 'credit_note_id',
        name: 'credit_note_id',
        type: 'model',
        module: creditNoteModule,
        required: true,
      },
      { key: 'title', name: 'title', type: 'input', required: true },
      { key: 'subtitle', name: 'subtitle', type: 'input' },
      { key: 'quantity', name: 'quantity', type: 'input' },
      { key: 'unit_price', name: 'unit_price', type: 'amount' },
    ],
  },
]

export const creditNoteLineModule = {
  sk: 'slug',
  table: {
    name: 'credit_note_line',
  },
  name: {
    singular: 'Credit Note Line',
    plural: 'Credit Note Lines',
  },
  select: {
    list: '*, credit_note(*)',
    detail:
      '*, credit_note(*, project(*, project_brand!project_id(*), brand(*)))',
  },
  Icon: CategoryOutlinedIcon,
}

export const creditNoteLinePreviewFormSections = creditNoteFormSections

export const creditNoteLineColumnDefs = [{ field: 'title' }]
