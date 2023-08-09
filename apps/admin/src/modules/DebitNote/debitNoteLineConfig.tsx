import React from 'react'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import productModule from '../Product/productModule'
import { QuotationLineProductPrices } from '../Quotation/components'
import { debitNoteModule } from './debitNoteConfig'

export const debitNoteFormSections = [
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
        key: 'debit_note_id',
        name: 'debit_note_id',
        type: 'model',
        module: debitNoteModule,
        required: true,
      },
      { key: 'title', name: 'title', type: 'input', required: true },
      { key: 'subtitle', name: 'subtitle', type: 'input' },
      { key: 'quantity', name: 'quantity', type: 'input' },
      { key: 'unit_price', name: 'unit_price', type: 'amount' },
    ],
  },
]

export const debitNoteLineModule = {
  sk: 'slug',
  table: {
    name: 'debit_note_line',
  },
  name: {
    singular: 'Debit Note Line',
    plural: 'Debit Note Lines',
  },
  select: {
    list: '*, debit_note(*)',
    detail:
      '*, debit_note(*, project(*, project_brand!project_id(*), brand(*)))',
  },
  Icon: CategoryOutlinedIcon,
}

export const debitNoteLinePreviewFormSections = debitNoteFormSections

export const debitNoteLineColumnDefs = [{ field: 'title' }]
