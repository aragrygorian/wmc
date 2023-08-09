import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined'
import { routes } from '@admin/app/routes'

export const permissionFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up general info',
    icon: <BallotOutlinedIcon />,
    fields: [
      { key: 'title', name: 'title', type: 'input', required: true },
      { key: 'subtitle', name: 'subtitle', type: 'input' },
    ],
  },
]

export const permissionModule = {
  sk: 'slug',
  table: {
    name: 'permission',
  },
  name: {
    singular: 'Permission',
    plural: 'Permissions',
  },
  route: {
    plural: routes.PERMISSIONS,
  },
  Icon: LockClockOutlinedIcon,
}

export const permissionColumnDefs = [{ field: 'title' }]

export const permissionPreviewFormSections = permissionFormSections
