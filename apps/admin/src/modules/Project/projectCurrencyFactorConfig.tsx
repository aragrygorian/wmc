import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import { routes } from '@admin/app/routes'
import { projectModule } from './projectConfig'
import { currencyFactorModule } from '../CurrencyFactor/currencyFactorConfig'

export const projectCurrencyFactorFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up general info',
    icon: <BallotOutlinedIcon />,
    fields: [
      {
        key: 'project_id',
        name: 'project_id',
        type: 'model',
        module: projectModule,
      },
      {
        key: 'currency_factor_id',
        name: 'currency_factor_id',
        type: 'model',
        module: currencyFactorModule,
      },
      [
        {
          key: 'buy_rate',
          name: 'buy_rate',
          type: 'rate',
          required: true,
          label: 'Rate',
        },
      ],
    ],
  },
]

export const projectCurrencyFactorModule = {
  sk: 'id',
  table: {
    name: 'project_currency_factor',
    isJoinTable: true,
  },
  name: {
    singular: 'Project Currency',
    plural: 'Project Currencies',
  },
  route: {
    plural: routes.PROJECT_CURRENCYS,
  },
  select: {
    detail: '*, project:project_id(*), currency_factor:currency_factor_id(*)',
    list: '*, project:project_id(*), currency_factor:currency_factor_id(*)',
  },
}

export const projectCurrencyFactorColumnDefs = [
  { field: 'currency_factor.title', headerName: 'Currency' },
  { field: 'buy_rate', headerName: 'Rate', maxWidth: 150 },
]

export const projectCurrencyFactorPreviewFormSections =
  projectCurrencyFactorFormSections
export const projectCurrencyFactorAddFormSections =
  projectCurrencyFactorFormSections
