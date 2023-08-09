import { User as PrismaUser } from '@prisma/client'
import { Role } from '@admin/modules/Role/types'

export interface User extends PrismaUser {
  role?: Role
}
