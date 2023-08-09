import { initUseFetch } from '@admin/lib/useFetch'
import { roleModule } from '@admin/modules/Role/roleConfig'
import initUseFetchCount from '../../../lib/useFetch/useFetchCount'
import { Role } from '../types'

export const useFetchRole = initUseFetch<Role>(roleModule)

export const useFetchRoleCount = initUseFetchCount(roleModule)
