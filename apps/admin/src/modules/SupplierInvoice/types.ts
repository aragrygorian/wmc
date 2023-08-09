import {
  SupplierInvoice as PrismaSupplierInvoice,
  SupplierInvoiceLine as PrismaSupplierInvoiceLine,
  SupplierInvoicePayment as PrismaSupplierInvoicePayment,
} from '@prisma/client'

export interface SupplierInvoiceLine extends PrismaSupplierInvoiceLine {
  supplier_invoice: PrismaSupplierInvoice
}

export interface SupplierInvoicePayment extends PrismaSupplierInvoicePayment {
  supplier_invoice: PrismaSupplierInvoice
}

export interface SupplierInvoice extends PrismaSupplierInvoice {
  lines: SupplierInvoiceLine[]
  payments: SupplierInvoicePayment[]
}
