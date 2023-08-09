import React, { useMemo } from 'react'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import { routes } from '@admin/app/routes'
import { LockOpen as LockOpenIcon } from '@mui/icons-material'
import { useFetchPermissions } from '@admin/modules/Permission/hooks/useFetchPermission'
import { capitalize } from 'lodash'
import {
  ADMIN_PERMISSION,
  OPERATION_PERMISSIONS,
} from '@admin/modules/Permission/constants'
import { Permission } from '@admin/modules/Permission/types'

export const useRoleFormSections = () => {
  const { data: permissions = [] } = useFetchPermissions(
    {},
    {
      select: (permissions) =>
        permissions.filter(({ title }) => title !== ADMIN_PERMISSION),
    }
  )

  return useMemo(
    () => [
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
      {
        key: 'permissions',
        title: 'Role Permissions',
        icon: <LockOpenIcon />,
        fields: [
          {
            key: 'permissions',
            name: 'permissions',
            type: 'CHECKBOX_TABLE',
            checkboxTableProps: {
              rows: permissions,
              columns: OPERATION_PERMISSIONS.map(capitalize),
              hasToggleRowColumn: true,
              title: 'Module',
              groupBy: (permission) =>
                (permission as Permission).title.replace(/^(.+)\..*/, '$1'),
            },
          },
        ],
      },
    ],
    [permissions]
  )
}

export const roleModule = {
  sk: 'slug',
  table: {
    name: 'role',
  },
  name: {
    singular: 'Role',
    plural: 'Roles',
  },
  relations: {
    permissions: { table: { name: 'role_permission' } },
  },
  route: {
    plural: routes.ROLES,
  },
  select: {
    list: '*',
    detail: '*, permissions:permission(*)',
  },
  Icon: BadgeOutlinedIcon,
}

export const roleColumnDefs = [{ field: 'title' }, { field: 'subtitle' }]
