import { routes } from '@admin/app/routes'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import React from 'react'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import { printPercentage } from '@gravis-os/utils'
import { brandModule } from '../Brand/brandConfig'
import { projectCurrencyFactorModule } from './projectCurrencyFactorConfig'

export const projectBrandFormSections = [
  {
    key: 'general',
    title: 'General',
    icon: <BallotOutlinedIcon />,
    fields: [
      {
        key: 'brand_id',
        name: 'brand_id',
        type: 'model',
        module: brandModule,
        select: 'id, title, company:company_id(title)',
        groupBy: ({ company }) => company.title,
        getOptionLabel: ({ title, company }) => `${title} (${company.title})`,
        required: true,
      },
    ],
  },
  {
    key: 'pricing',
    title: 'Pricing',
    icon: <MonetizationOnOutlinedIcon />,
    fields: [
      { key: 'discount_rate', name: 'discount_rate', type: 'percentage' },
      {
        key: 'additional_discount_rate',
        name: 'additional_discount_rate',
        type: 'percentage',
      },
      {
        key: 'project_currency_factor_id',
        name: 'project_currency_factor_id',
        type: 'model',
        module: projectCurrencyFactorModule,
        pk: 'currency_factor.title',
        select: 'id, buy_rate, currency_factor:currency_factor_id(title)',
        getOptionLabel: ({
          currency_factor: currencyFactor,
          buy_rate: buyRate,
        }) => `${currencyFactor.title} (${buyRate})`,
        label: 'Currency Factor',
        required: true,
      },
      {
        key: 'coefficient_rate',
        name: 'coefficient_rate',
        type: 'rate',
        required: true,
      },
      { key: 'markup_rate', name: 'markup_rate', type: 'rate', required: true },
      {
        key: 'handling_rate',
        name: 'handling_rate',
        type: 'rate',
        required: true,
      },
    ],
  },
]

export const projectBrandModule = {
  sk: 'id',
  table: {
    name: 'project_brand',
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
    list: '*, brand(title, company:company_id(title, slug)), project_currency_factor(currency_factor(title), buy_rate)',
    detail: '*, brand(*, company:company_id(*), currency_factor(*))',
  },
}

export const projectBrandColumnDefs = [
  {
    field: 'brand.title',
    headerName: 'Brand',
    valueGetter: ({ data }) =>
      `${data.brand.title} (${data.brand.company.title})`,
    minWidth: 250,
  },
  {
    field: 'discount_rate',
    headerName: 'Discount',
    valueFormatter: ({ value }) => printPercentage(value),
    maxWidth: 120,
  },
  {
    field: 'additional_discount_rate',
    headerName: 'Additional Discount Rate',
    valueFormatter: ({ value }) => printPercentage(value),
    maxWidth: 120,
  },
  {
    field: 'project_currency_factor_id',
    headerName: 'Currency Factor',
    valueGetter: ({ data }) => {
      const { project_currency_factor: projectCurrencyFactor } = data || {}
      const { currency_factor: currencyFactor, buy_rate: buyRate } =
        projectCurrencyFactor || {}
      return `${currencyFactor.title} (${buyRate})`
    },
    maxWidth: 120,
  },
  { field: 'coefficient_rate', maxWidth: 120 },
  { field: 'markup_rate', maxWidth: 120 },
  { field: 'handling_rate', maxWidth: 120 },
]

export const projectBrandPreviewFormSections = projectBrandFormSections

export const projectBrandAddFormSections = projectBrandFormSections
