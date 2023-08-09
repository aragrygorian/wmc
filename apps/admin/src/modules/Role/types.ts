import { Role as PrismaRole } from '@prisma/client'
import { Permission } from '@admin/modules/Permission/types'

export interface Role extends PrismaRole {
  permissions?: Permission[]
}
