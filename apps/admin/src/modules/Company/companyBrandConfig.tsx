import { routes } from '@admin/app/routes'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import React from 'react'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import { printPercentage } from '@gravis-os/utils'
import { brandModule } from '../Brand/brandConfig'

export const companyBrandFormSections = [
  {
    key: 'general',
    title: 'General',
    icon: <BallotOutlinedIcon />,
    fields: [
      { key: 'brand_id', name: 'brand_id', type: 'model', module: brandModule },
    ],
  },
  {
    key: 'pricing',
    title: 'Pricing',
    icon: <MonetizationOnOutlinedIcon />,
    fields: [
      { key: 'discount_rate', name: 'discount_rate', type: 'percentage' },
    ],
  },
]

export const companyBrandModule = {
  sk: 'id',
  table: {
    name: 'company_brand',
    isJoinTable: true,
  },
  name: {
    singular: 'Brand Discount',
    plural: 'Brand Discounts',
  },
  route: {
    plural: routes.PROJECTS,
  },
  select: {
    list: '*, brand(title, company:company_id(title, slug), currency_factor(title, buy_rate, sell_rate))',
    detail: '*, brand(*, company:company_id(*), currency_factor(*))',
  },
}

export const companyBrandColumnDefs = [
  { field: 'brand.title', headerName: 'Brand' },
  {
    field: 'discount_rate',
    headerName: 'Discount',
    valueFormatter: ({ value }) => printPercentage(value),
  },
]

export const companyBrandPreviewFormSections = companyBrandFormSections

export const companyBrandAddFormSections = companyBrandFormSections
