import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import BrandingWatermarkOutlinedIcon from '@mui/icons-material/BrandingWatermarkOutlined'
import { routes } from '@admin/app/routes'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import { printPercentage } from '@gravis-os/utils'
import { FormSectionProps } from '@gravis-os/form'
import { companyModule } from '../Company/companyConfig'
import { currencyFactorModule } from '../CurrencyFactor/currencyFactorConfig'

export const pricingFormSection: FormSectionProps = {
  key: 'pricing',
  title: 'Pricing',
  subtitle: 'Enter product profit, margin, cost, and other pricing details',
  icon: <MonetizationOnOutlinedIcon />,
  fields: [
    [
      { key: 'coefficient_rate', name: 'coefficient_rate', type: 'rate' },
      { key: 'markup_rate', name: 'markup_rate', type: 'rate' },
      { key: 'margin_rate', name: 'margin_rate', type: 'percentage' },
    ],
    [
      { key: 'discount_rate', name: 'discount_rate', type: 'percentage' },
      {
        key: 'additional_discount_rate',
        name: 'additional_discount_rate',
        type: 'percentage',
      },
      {
        key: 'costing_rate',
        name: 'costing_rate',
        type: 'percentage',
      },
    ],
    {
      key: 'is_roundup_to_nearest_dollar',
      name: 'is_roundup_to_nearest_dollar',
      type: 'switch',
    },
  ],
}

export const brandFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up brand details',
    icon: <BallotOutlinedIcon />,
    fields: [
      { key: 'code', name: 'code', label: 'Prefix', type: 'input' },
      {
        key: 'company_id',
        name: 'company_id',
        type: 'model',
        module: companyModule,
      },
      {
        key: 'title',
        name: 'title',
        label: 'Brand Name',
        type: 'input',
        required: true,
      },
      { key: 'subtitle', name: 'subtitle', type: 'input' },
      {
        key: 'currency_factor_id',
        name: 'currency_factor_id',
        type: 'model',
        module: currencyFactorModule,
      },
    ],
  },
  pricingFormSection,
]

export const brandModule = {
  sk: 'slug',
  table: {
    name: 'brand',
  },
  name: {
    singular: 'Brand',
    plural: 'Brands',
  },
  route: {
    plural: routes.BRANDS,
  },
  select: {
    detail: '*, company:company_id(*), currency_factor(*)',
    list: '*, company:company_id(title), currency_factor(title, buy_rate, sell_rate)',
  },
  Icon: BrandingWatermarkOutlinedIcon,
}

export const brandColumnDefs = [
  { field: 'title' },
  { field: 'company.title', headerName: 'Company', minWidth: 140 },
  { field: 'currency_factor.title', headerName: 'CCY' },
  { field: 'code' },
  { field: 'coefficient_rate', headerName: 'Coeff' },
  {
    field: 'discount_rate',
    headerName: 'Disc.',
    valueFormatter: ({ value }) => printPercentage(value),
  },
  {
    field: 'additional_discount_rate',
    headerName: 'Add. Disc.',
    valueFormatter: ({ value }) => printPercentage(value),
  },
  { field: 'currency_factor.buy_rate', headerName: 'Buy Rate' },
  { field: 'currency_factor.sell_rate', headerName: 'Sell Rate' },
  { field: 'markup_rate', headerName: 'Markup' },
  { field: 'margin_rate', headerName: 'Margin' },
  {
    field: 'costing_rate',
    headerName: 'Costing',
    valueFormatter: ({ value }) => printPercentage(value),
  },
]

export const brandPreviewFormSections = brandFormSections

export const brandAddFormSections = brandFormSections
