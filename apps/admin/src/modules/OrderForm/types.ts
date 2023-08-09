import {
  Company,
  OrderForm as PrismaOrderForm,
  OrderFormLine as PrismaOrderFormLine,
  PurchaseOrderLine as PrismaPurchaseOrderLine,
} from '@prisma/client'
import { Product } from '../Product/types'
import { Reservation } from '../Reservation/types'

export interface OrderForm extends PrismaOrderForm {
  lines?: OrderFormLine[]
  company?: Company
}

export interface OrderFormLine extends PrismaOrderFormLine {
  order_form: PrismaOrderForm
  product_id: number
  product: Product
  purchase_order_line?: PrismaPurchaseOrderLine[]
  reservation?: Reservation[]
}
