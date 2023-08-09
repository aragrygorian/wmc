import initUseFetchCount from '@admin/lib/useFetch/useFetchCount'
import { initUseFetch } from '../../../lib/useFetch'
import { SupplierInvoiceLine } from '../types'
import { supplierInvoiceLineModule } from '../supplierInvoiceLineConfig'

export const useFetchSupplierInvoiceLines = initUseFetch<SupplierInvoiceLine>(
  supplierInvoiceLineModule
)

export const useFetchSupplierInvoiceLineCount = initUseFetchCount(
  supplierInvoiceLineModule
)
