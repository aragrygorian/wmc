import { Permission, Role, User } from '@prisma/client'
import { ReactElement } from 'react'

export type AppRole = Role & {
  permission: Permission[]
}

export type AppUser = User & {
  role?: AppRole
}

export interface NavConfig {
  name?: string
  key?: string
  title?: string
  href?: string
  startIcon?: ReactElement
  items?: NavConfig[]
}
