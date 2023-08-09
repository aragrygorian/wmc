import React from 'react'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import productModule from '../Product/productModule'
import { QuotationLineProductPrices } from '../Quotation/components'
import { goodsReturnNoteModule } from './goodsReturnNoteConfig'

export const goodsReturnNoteFormSections = [
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
        key: 'goods_return_note_id',
        name: 'goods_return_note_id',
        type: 'model',
        module: goodsReturnNoteModule,
        required: true,
      },
      { key: 'title', name: 'title', type: 'input', required: true },
      { key: 'subtitle', name: 'subtitle', type: 'input' },
      { key: 'quantity', name: 'quantity', type: 'input' },
      { key: 'unit_price', name: 'unit_price', type: 'amount' },
    ],
  },
]

export const goodsReturnNoteLineModule = {
  sk: 'slug',
  table: {
    name: 'goods_return_note_line',
  },
  name: {
    singular: 'Goods Return Note Line',
    plural: 'Goods Return Note Lines',
  },
  select: {
    list: '*, goods_return_note(*)',
    detail:
      '*, goods_return_note(*, project(*, project_brand!project_id(*), brand(*)))',
  },
  Icon: CategoryOutlinedIcon,
}

export const goodsReturnNoteLinePreviewFormSections =
  goodsReturnNoteFormSections

export const goodsReturnNoteLineColumnDefs = [{ field: 'title' }]
