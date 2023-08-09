import { Permission } from '@admin/modules/Permission/types'

export const getOperationFromPermission = (permission: Permission) =>
  permission.title.substring(permission.title.indexOf('.') + 1)
