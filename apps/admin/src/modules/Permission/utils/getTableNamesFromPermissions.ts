import { Permission } from '@admin/modules/Permission/types'

export const getTableNamesFromPermission = (permission: Permission) =>
  permission.title.substring(0, permission.title.indexOf('.'))
