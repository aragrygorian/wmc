import { find } from '@admin/lib/useFetch/api/find'
import { Quotation } from '@admin/modules/Quotation/types'
import { quotationModule } from '@admin/modules/Quotation/quotationModule'

export const findQuotation = find<Quotation>(quotationModule)
