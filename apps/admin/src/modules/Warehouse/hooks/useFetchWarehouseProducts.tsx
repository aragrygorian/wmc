import { initUseFetch } from '@admin/lib/useFetch'
import initUseFetchCount from '@admin/lib/useFetch/useFetchCount'
import { warehouseProductModule } from '../warehouseProductConfig'
import { WarehouseProduct } from '../types'

export const useFetchWarehouseProducts = initUseFetch<WarehouseProduct>(
  warehouseProductModule
)

export const useFetchWarehouseProductCount = initUseFetchCount(
  warehouseProductModule
)
