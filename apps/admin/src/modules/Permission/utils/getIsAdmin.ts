import { Permission } from '@admin/modules/Permission/types'
import { ADMIN_PERMISSION } from '@admin/modules/Permission/constants'

export const getIsAdmin = (permissions: Permission[]) =>
  permissions.some(({ title }) => title === ADMIN_PERMISSION)
