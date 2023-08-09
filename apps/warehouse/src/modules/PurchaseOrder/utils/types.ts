import {
  Company as PrismaCompany,
  Inventory as PrismaInventory,
  Product as PrismaProduct,
  PurchaseOrder as PrismaPurchaseOrder,
  PurchaseOrderLine as PrismaPurchaseOrderLine,
} from '@prisma/client'

export interface PurchaseOrderLine extends PrismaPurchaseOrderLine {
  purchase_order: PrismaPurchaseOrder
  product?: PrismaProduct
  inventory?: PrismaInventory[]
  receiving_quantity?: number
}

export interface PurchaseOrder extends PrismaPurchaseOrder {
  company?: PrismaCompany
  lines?: PurchaseOrderLine[]
}
