import {
  Company,
  DeliveryOrder as PrismaDeliveryOrder,
  DeliveryOrderLine as PrismaDeliveryOrderLine,
} from '@prisma/client'
import { Product } from '../Product/types'
import { SalesOrder } from '../SalesOrder/types'
import { DeliveryInstruction } from '../DeliveryInstruction/types'

export interface DeliveryOrder extends PrismaDeliveryOrder {
  company: Company
  lines: DeliveryOrderLine[]
  sales_order: SalesOrder
  delivery_instruction?: DeliveryInstruction[]
}

export interface DeliveryOrderLine extends PrismaDeliveryOrderLine {
  product: Product
}
