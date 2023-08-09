import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import { routes } from '@admin/app/routes'
import { roleModule } from '../Role/roleConfig'
import { createGeneralFilterFormSection } from '../../utils/configHelpers'

export const userFields = {
  avatar_src: { key: 'avatar_src', name: 'avatar_src', type: 'image' },
  email: {
    key: 'email',
    name: 'email',
    type: 'input',
    required: true,
    disabled: ({ isNew }) => !isNew,
  },
  password: {
    key: 'password',
    name: 'password',
    type: 'password',
    required: true,
    disabled: ({ isNew }) => !isNew,
  },
  first_name: { key: 'first_name', name: 'first_name', type: 'input' },
  last_name: { key: 'last_name', name: 'last_name', type: 'input' },
  role_id: {
    key: 'role_id',
    name: 'role_id',
    type: 'model',
    module: roleModule,
  },
}

export const userFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up general info',
    icon: <BallotOutlinedIcon />,
    fields: [
      userFields.avatar_src,
      userFields.email,
      userFields.password,
      [userFields.first_name, userFields.last_name],
      userFields.role_id,
    ],
  },
]

export const userModule = {
  sk: 'slug',
  table: {
    name: 'user',
  },
  name: {
    singular: 'User',
    plural: 'Users',
  },
  route: {
    plural: routes.USERS,
  },
  select: {
    list: '*, role(id, title)',
    detail: '*, role(*)',
  },
  Icon: PersonOutlinedIcon,
}

export const userColumnDefs = [
  { field: 'email', minWidth: 300, hasAvatar: true },
  { field: 'full_name', minWidth: 250, flex: 1 },
  { field: 'role.title', headerName: 'Role', minWidth: 100, flex: 0 },
]

export const userFilterFormSections = [
  createGeneralFilterFormSection([
    {
      key: 'full_name',
      name: 'full_name',
      type: 'input',
      op: 'ilike',
    },
    userFields.role_id,
  ]),
]

export const userPreviewFormSections = userFormSections
