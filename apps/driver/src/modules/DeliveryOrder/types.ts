import {
  Company as PrismaCompany,
  Contact as PrismaContact,
  DeliveryOrder as PrismaDeliveryOrder,
  DeliveryOrderLine as PrismaDeliveryOrderLine,
  Product as PrismaProduct,
  Project as PrismaProject,
  SalesOrder as PrismaSalesOrder,
} from '@prisma/client'
import { PickAndPack } from '../PickAndPack/types'

/** Represents an extended DeliveryOrderLine which contains the product information.
 *
 * @extends PrismaDeliveryOrderLine
 *
 * @prop {PrismaProduct} product
 */
export interface DeliveryOrderLine extends PrismaDeliveryOrderLine {
  product: PrismaProduct
}

/** Represents an extended DeliveryOrder which contains lines, sales_order, and delivery_instruction.
 *
 * @extends PrismaDeliveryOrder
 *
 * @prop {DeliveryOrderLine} lines
 * @prop {PrismaSalesOrder} sales_order
 * @prop {PickAndPack[]} pick_and_packs?
 * @prop {PrismaCompany} company
 * @prop {PrismaContact} contact
 */
export interface DeliveryOrder extends PrismaDeliveryOrder {
  lines?: DeliveryOrderLine[]
  sales_order?: PrismaSalesOrder
  pick_and_packs?: PickAndPack[]
  project?: PrismaProject
  company?: PrismaCompany
  contact?: PrismaContact
}
