import React, { useMemo } from 'react'
import useUser from '@admin/app/useUser'
import { useFetchPermissions } from '@admin/modules/Permission/hooks/useFetchPermission'
import NAV_CONFIG from '@admin/app/navConfig'
import { Permission } from '@admin/modules/Permission/types'
import { NavConfig } from '@admin/app/types'
import { READ_PERMISSION } from '@admin/modules/Permission/constants'
import { getOperationFromPermission } from '@admin/modules/Permission/utils/getOperationFromPermission'
import { getTableNamesFromPermission } from '@admin/modules/Permission/utils/getTableNamesFromPermissions'
import { curry, isEmpty } from 'lodash'
import { getIsAdmin } from '@admin/modules/Permission/utils/getIsAdmin'

const hasReadPermission = (permission: Permission) =>
  getOperationFromPermission(permission) === READ_PERMISSION

const isRouteAllowed = (permissions: Permission[], config: NavConfig) =>
  permissions
    .filter(
      (permission) => getTableNamesFromPermission(permission) === config.name
    )
    .some(hasReadPermission)

const isNestedRouteConfigEmpty = (config: NavConfig) =>
  config?.items && isEmpty(config?.items)

const getRestrictedConfig = (
  navConfig: NavConfig[],
  permissions: Permission[]
): NavConfig[] => {
  const hasAccess = curry(isRouteAllowed)(permissions)

  const restrictNestedRouteConfig = (config: NavConfig) =>
    config?.items
      ? {
          ...config,
          items: config?.items.filter(hasAccess),
        }
      : config

  const restrictRoutes = (config) =>
    hasAccess(config) || !isNestedRouteConfigEmpty(config)

  return navConfig
    .map(restrictNestedRouteConfig)
    .filter((config) => (config?.items ? true : hasAccess))
    .filter(restrictRoutes)
}

const getConfig = (
  navConfig: NavConfig[],
  permissions: Permission[]
): NavConfig[] =>
  getIsAdmin(permissions)
    ? navConfig
    : getRestrictedConfig(navConfig, permissions)

const useNav = () => {
  const { dbUser } = useUser()

  const { data: permissions = [] } = useFetchPermissions({
    select: '*, role_permission!inner(*)',
    match: { 'role_permission.role_id': dbUser?.role_id },
  })

  const config: NavConfig[] = useMemo(
    () => getConfig(NAV_CONFIG, permissions),
    [permissions]
  )

  return { config }
}

export default useNav
