import initUseFetchCount from '@admin/lib/useFetch/useFetchCount'
import { orderFormLineModule } from '../orderFormLineConfig'
import { OrderFormLine } from '../types'
import { initUseFetch } from '../../../lib/useFetch'

export const useFetchOrderFormLines =
  initUseFetch<OrderFormLine>(orderFormLineModule)

export const useFetchOrderFormLineCount = initUseFetchCount(orderFormLineModule)
