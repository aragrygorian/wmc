import { Inventory } from '@prisma/client'
import initUseFetchCount from '@admin/lib/useFetch/useFetchCount'
import inventoryModule from '../inventoryModule'
import { initUseFetch } from '../../../lib/useFetch'

export const useFetchInventories = initUseFetch<Inventory>(inventoryModule)

export const useFetchInventoryCount = initUseFetchCount(inventoryModule)
