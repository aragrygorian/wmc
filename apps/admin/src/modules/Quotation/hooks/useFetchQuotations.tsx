import initUseFetchCount from '@admin/lib/useFetch/useFetchCount'
import { quotationModule } from '@admin/modules/Quotation/quotationModule'
import { initUseFetch } from '../../../lib/useFetch'
import { Quotation } from '../types'

export const useFetchQuotations = initUseFetch<Quotation>(quotationModule)

export const useFetchQuotationCount = initUseFetchCount(quotationModule)
