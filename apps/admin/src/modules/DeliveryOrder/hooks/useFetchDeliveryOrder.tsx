import { initUseFetch } from '@admin/lib/useFetch'
import { DeliveryOrder } from '@admin/modules/DeliveryOrder/types'
import { deliveryOrderModule } from '@admin/modules/DeliveryOrder'
import initUseFetchCount from '../../../lib/useFetch/useFetchCount'

export const useFetchDeliveryOrders =
  initUseFetch<DeliveryOrder>(deliveryOrderModule)

export const useFetchDeliveryOrderCount = initUseFetchCount(deliveryOrderModule)
