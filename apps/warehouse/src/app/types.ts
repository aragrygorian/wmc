import { Role, User, Permission } from '@prisma/client'

export type AppRole = Role & {
  permission: Permission[]
}

export type AppUser = User & {
  role?: AppRole
}
