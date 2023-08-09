import { DeliveryOrder } from '@driver/modules/DeliveryOrder/types'
import { flatMap, map, uniqBy } from 'lodash'
import { Warehouse } from '../types'

/** Extract warehouse names from delivery orders */
export const getWarehouseFromDeliveryOrders = (
  deliveryOrders: DeliveryOrder[]
): Warehouse[] => {
  // Remove duplicate warehouse
  return uniqBy(
    // Extract delivery instructions
    flatMap(deliveryOrders, (deliveryOrder) =>
      // For each delivery instructions, extract warehouse
      map(
        deliveryOrder.pick_and_packs,
        (pickAndPack) => pickAndPack.warehouse as Warehouse
      )
    ),
    'id'
  )
}
