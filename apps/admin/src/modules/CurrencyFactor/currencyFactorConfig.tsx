import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import { routes } from '@admin/app/routes'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'

export const currencyFactorFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up details',
    icon: <BallotOutlinedIcon />,
    fields: [
      { key: 'title', name: 'title', type: 'input', required: true },
      {
        key: 'buy_rate',
        name: 'buy_rate',
        type: 'rate',
        required: true,
      },
      {
        key: 'sell_rate',
        name: 'sell_rate',
        type: 'rate',
        required: true,
      },
    ],
  },
]

export const currencyFactorModule = {
  sk: 'slug',
  table: {
    name: 'currency_factor',
  },
  name: {
    singular: 'Currency Factor',
    plural: 'Currency Factors',
  },
  route: {
    plural: routes.CURRENCY_FACTORS,
  },
  Icon: CurrencyExchangeOutlinedIcon,
}

export const currencyFactorPreviewFormSections = currencyFactorFormSections

export const currencyFactorColumnDefs = [
  { field: 'title', headerName: 'Currency' },
  { field: 'buy_rate', headerName: 'Buy Rate', maxWidth: 150 },
  { field: 'sell_rate', headerName: 'Sell Rate', maxWidth: 150 },
]
