import { initUseFetch } from '@admin/lib/useFetch'
import { permissionModule } from '@admin/modules/Permission/permissionConfig'
import initUseFetchCount from '../../../lib/useFetch/useFetchCount'
import { Permission } from '../types'

export const useFetchPermissions = initUseFetch<Permission>(permissionModule)

export const useFetchPermissionCount = initUseFetchCount(permissionModule)
