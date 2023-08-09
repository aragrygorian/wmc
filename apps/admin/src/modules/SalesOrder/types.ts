import {
  Company,
  Contact,
  ProgressiveClaimLine,
  SalesOrder as PrismaSalesOrder,
  SalesOrderLine as PrismaSalesOrderLine,
} from '@prisma/client'
import { DeliveryOrder } from '../DeliveryOrder/types'
import { OrderForm } from '../OrderForm/types'
import { Product } from '../Product/types'

export interface SalesOrder extends PrismaSalesOrder {
  lines: SalesOrderLine[]
  order_form?: OrderForm[]
  delivery_order?: DeliveryOrder[]
  contact?: Contact
  company?: Company
}

export interface SalesOrderLine extends PrismaSalesOrderLine {
  sales_order: SalesOrder
  product: Product
  progressive_claim_line: ProgressiveClaimLine[]
}
