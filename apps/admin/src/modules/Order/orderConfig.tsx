import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import { routes } from '@admin/app/routes'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'

export const orderFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up general info',
    icon: <BallotOutlinedIcon />,
    fields: [
      { key: 'title', name: 'title', type: 'input', required: true },
      { key: 'description', name: 'description', type: 'input' },
    ],
  },
]

export const orderModule = {
  sk: 'slug',
  table: {
    name: 'order',
  },
  name: {
    singular: 'Sales Order',
    plural: 'Sales Orders',
  },
  route: {
    plural: routes.ORDERS,
  },
  Icon: ReceiptOutlinedIcon,
}

export const orderColumnDefs = [
  { field: 'title' },
  { field: 'status' },
  { field: 'created_at', headerName: 'Created At' },
]

export const orderPreviewFormSections = orderFormSections
