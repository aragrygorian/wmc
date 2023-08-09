import { useGetItem } from '@gravis-os/crud'
import { deliveryOrderModule } from '../deliveryOrderConfig'
import { DeliveryOrder } from '../types'

/**
 * Function used to obtain a specific delivery order based on provided module.
 * @returns Returns the specific delivery order information
 */
const useGetDeliveryOrderDetails = (): DeliveryOrder | undefined | null => {
  const onUseGetItem = useGetItem({ module: deliveryOrderModule })
  const { item } = onUseGetItem
  // Typecast as DriverDeliveryOrder if not null or undefined
  if (item) return item as DeliveryOrder
  // Else, return either undefined or null
  return item
}

export default useGetDeliveryOrderDetails
