import useUser from '@admin/app/useUser'
import { useFetchRole } from '@admin/modules/Role/hooks/useFetchRole'
import { first } from 'lodash'
import {
  ADMIN_ROLE,
  SALES_MANAGER_ROLE,
  SALESPERSON_ROLE,
} from '@admin/modules/Role/constants'
import { RoleType } from '@prisma/client'

export const useIsAuthorised = () => {
  const { user } = useUser()

  const { data: roles = [] } = useFetchRole(
    {
      select: '*',
      match: { id: user?.role_id },
    },
    { enabled: Boolean(user) }
  )

  const role = first(roles)
  const { type } = role || {}

  const isAllowed = (allowedRoles: RoleType[]) =>
    [...allowedRoles, ADMIN_ROLE].includes(type)

  return {
    canApproveDiscount: isAllowed([SALES_MANAGER_ROLE]),
    canRequestDiscount: isAllowed([SALESPERSON_ROLE]),
  }
}
