import { find } from '@admin/lib/useFetch/api/find'
import { DeliveryOrder } from '@admin/modules/DeliveryOrder/types'
import { deliveryOrderModule } from '@admin/modules/DeliveryOrder'

export const findDeliveryOrder = find<DeliveryOrder>(deliveryOrderModule)
