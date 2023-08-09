import invoiceModule from '@admin/modules/Invoice/invoiceModule'
import { initUseFetchCount } from '@admin/lib/useFetch/useFetchCount'
import { initUseFetch } from '@admin/lib/useFetch'
import { Invoice } from '@admin/modules/Invoice/types'

export const useFetchInvoices = initUseFetch<Invoice>(invoiceModule)

export const useFetchInvoiceCount = initUseFetchCount(invoiceModule)
