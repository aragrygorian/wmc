import {
  Inventory as PrismaInventory,
  Reservation as PrismaReservation,
  Warehouse as PrismaWarehouse,
  WarehouseProduct as PrismaWarehouseProduct,
} from '@prisma/client'
import { Product } from '../Product/types'
import { PurchaseOrderLine } from '../PurchaseOrder/types'

export type WarehouseProductStatus = 'Instock' | 'Out of Stock'

export interface Warehouse extends PrismaWarehouse {
  products: WarehouseProduct[]
}

export interface WarehouseProduct extends PrismaWarehouseProduct {
  warehouse: Warehouse
  product: Product
  inventory: Inventory[]
  reservation?: PrismaReservation[]
}

export interface Inventory extends PrismaInventory {
  warehouseProduct: WarehouseProduct
  purchaseOrderLine?: PurchaseOrderLine
}
