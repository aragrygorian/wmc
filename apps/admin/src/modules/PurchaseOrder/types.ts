import {
  Inventory as PrismaInventory,
  PurchaseOrder as PrismaPurchaseOrder,
  PurchaseOrderLine as PrismaPurchaseOrderLine,
  Reservation as PrismaReservation,
} from '@prisma/client'
import { OrderFormLine } from '../OrderForm/types'
import { Product } from '../Product/types'

export interface PurchaseOrderLine
  extends Omit<PrismaPurchaseOrderLine, 'product_id' | 'order_form_line_id'> {
  purchase_order: PrismaPurchaseOrder
  product_id: number
  product?: Product
  order_form_line_id?: number
  order_form_line?: OrderFormLine
  reservation?: PrismaReservation[]
  inventory?: PrismaInventory[]
}

export interface PurchaseOrder extends PrismaPurchaseOrder {
  lines: PurchaseOrderLine[]
}
