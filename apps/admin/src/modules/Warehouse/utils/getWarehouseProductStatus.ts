import {
  WAREHOUSE_STATUS_INSTOCK,
  WAREHOUSE_STATUS_OUT_OF_STOCK,
} from '@admin/modules/Warehouse/constants'
import { WarehouseProductStatus } from '../types'

export const getWarehouseProductStatus = (
  instock: number
): WarehouseProductStatus =>
  instock > 0 ? WAREHOUSE_STATUS_INSTOCK : WAREHOUSE_STATUS_OUT_OF_STOCK
