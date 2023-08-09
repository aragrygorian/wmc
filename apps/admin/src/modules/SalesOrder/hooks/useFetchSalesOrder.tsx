import { initUseFetch } from '@admin/lib/useFetch'
import initUseFetchCount from '@admin/lib/useFetch/useFetchCount'
import { SalesOrder } from '@admin/modules/SalesOrder/types'
import { salesOrderModule } from '@admin/modules/SalesOrder/salesOrderConfig'

export const useFetchSalesOrders = initUseFetch<SalesOrder>(salesOrderModule)
export const useFetchSalesOrderCount = initUseFetchCount(salesOrderModule)
