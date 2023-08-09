import initUseFetchCount from '@admin/lib/useFetch/useFetchCount'
import { InvoiceLine } from '../types'
import { initUseFetch } from '../../../lib/useFetch'
import { invoiceLineModule } from '../invoiceLineConfig'

export const useFetchInvoiceLines = initUseFetch<InvoiceLine>(invoiceLineModule)

export const useFetchInvoiceLineCount = initUseFetchCount(invoiceLineModule)
