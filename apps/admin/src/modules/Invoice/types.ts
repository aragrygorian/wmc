import {
  Company,
  Contact,
  Invoice as PrismaInvoice,
  InvoiceLine as PrismaInvoiceLine,
  InvoicePayment as PrismaInvoicePayment,
  Project,
} from '@prisma/client'
import { Product } from '@admin/modules/Product/types'

export interface InvoiceLine extends PrismaInvoiceLine {
  invoice: PrismaInvoice
  product?: Product
  quantity: number
}

export interface InvoicePayment extends PrismaInvoicePayment {
  invoice: PrismaInvoice
}

export interface Invoice extends PrismaInvoice {
  lines: InvoiceLine[]
  payments: InvoicePayment[]
  project?: Project
  company?: Company
  contact?: Contact
}
