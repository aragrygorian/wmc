import React from 'react'
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined'
import { routes } from '@admin/app/routes'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import { printAmount } from '@gravis-os/utils'
import { brandModule, brandPreviewFormSections } from '../Brand/brandConfig'
import {
  categoryModule,
  categoryPreviewFormSections,
} from '../Category/categoryConfig'
import { createGeneralFilterFormSection } from '../../utils/configHelpers'

export const serviceFields = {
  model_code: {
    key: 'model_code',
    name: 'model_code',
    type: 'input',
    label: 'Service ID',
    required: true,
  },
  brand_id: {
    key: 'brand_id',
    name: 'brand_id',
    type: 'model',
    module: brandModule,
    required: true,
    select:
      '*, currency_factor(title, buy_rate, sell_rate), company:company_id(id, title)',
  },
  title: {
    key: 'title',
    name: 'title',
    type: 'input',
    label: 'Service Description',
  },
  category_id: {
    key: 'category_id',
    name: 'category_id',
    type: 'model',
    module: categoryModule,
  },
}

export const serviceFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up general info',
    icon: <RoomServiceOutlinedIcon />,
    fields: Object.values(serviceFields),
  },
  {
    key: 'pricing',
    title: 'Pricing',
    subtitle: 'Enter pricing details',
    icon: <MonetizationOnOutlinedIcon />,
    fields: [{ key: 'amount', name: 'amount', type: 'amount' }],
  },
]

export const serviceModule = {
  sk: 'slug',
  table: {
    name: 'service',
  },
  name: {
    singular: 'Service',
    plural: 'Services',
  },
  route: {
    plural: routes.SERVICES,
  },
  select: {
    detail: '*, brand(id, title), category(id, title)',
    list: '*, brand(*), category(*)',
  },
  Icon: RoomServiceOutlinedIcon,
}

export const serviceColumnDefs = [
  {
    field: 'model_code',
    headerName: 'Model',
    minWidth: 250,
  },
  {
    field: 'title',
    headerName: 'Description',
    minWidth: 350,
  },
  {
    field: 'brand.title',
    headerName: 'Brand',
    module: brandModule,
    previewFormSections: brandPreviewFormSections,
  },
  {
    field: 'category.title',
    headerName: 'Category',
    module: categoryModule,
    previewFormSections: categoryPreviewFormSections,
  },
  { field: 'amount', valueFormatter: ({ value }) => printAmount(value) },
]

export const serviceFilterFormSections = [
  createGeneralFilterFormSection([
    [
      {
        key: 'min_amount',
        name: 'min_amount',
        label: 'Min Amount',
        type: 'amount',
        filterKey: 'amount',
        op: 'gte',
      },
      {
        key: 'max_amount',
        name: 'max_amount',
        label: 'Max Amount',
        type: 'amount',
        filterKey: 'amount',
        op: 'lte',
      },
    ],
    { ...serviceFields.model_code, op: 'ilike', required: false },
    serviceFields.brand_id,
    serviceFields.category_id,
  ]),
]

export const servicePreviewFormSections = serviceFormSections
