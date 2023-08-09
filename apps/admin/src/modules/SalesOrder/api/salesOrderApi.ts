import { find } from '@admin/lib/useFetch/api/find'
import { SalesOrder } from '@admin/modules/SalesOrder/types'
import { salesOrderModule } from '@admin/modules/SalesOrder/salesOrderConfig'

export const findSalesOrder = find<SalesOrder>(salesOrderModule)
