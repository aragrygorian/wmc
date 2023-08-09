import initUseFetchCount from '@admin/lib/useFetch/useFetchCount'
import { initUseFetch } from '../../../lib/useFetch'
import { warehouseModule } from '../warehouseConfig'
import { Warehouse } from '../types'

export const useFetchWarehouses = initUseFetch<Warehouse>(warehouseModule)

export const useFetchWarehouseCount = initUseFetchCount(warehouseModule)
