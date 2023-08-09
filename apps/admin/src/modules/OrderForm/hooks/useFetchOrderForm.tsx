import { initUseFetchCount } from '@admin/lib/useFetch/useFetchCount'
import { initUseFetch } from '@admin/lib/useFetch'
import { OrderForm } from '@admin/modules/OrderForm/types'
import { orderFormModule } from '@admin/modules/OrderForm/orderFormConfig'

export const useFetchOrderForms = initUseFetch<OrderForm>(orderFormModule)

export const useFetchOrderFormCount = initUseFetchCount(orderFormModule)
