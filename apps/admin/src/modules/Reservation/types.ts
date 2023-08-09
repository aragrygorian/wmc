import { Reservation as PrismaReservation } from '@prisma/client'
import type { Product } from '@admin/modules/Product/types'
import type { WarehouseProduct } from '../Warehouse/types'

export type ReservationStatus =
  | 'Pending stock arrival'
  | 'Stock arrived'
  | 'Completed'

export interface Reservation extends PrismaReservation {
  product?: Product
  warehouse_product?: WarehouseProduct
}
