import initUseFetchCount from '@admin/lib/useFetch/useFetchCount'
import { SalesOrderLine } from '../types'
import { initUseFetch } from '../../../lib/useFetch'
import { salesOrderLineModule } from '../salesOrderLineConfig'

export const useFetchSalesOrderLines =
  initUseFetch<SalesOrderLine>(salesOrderLineModule)

export const useFetchSalesOrderLineCount =
  initUseFetchCount(salesOrderLineModule)
