import { useGetItem } from '@gravis-os/crud'
import purchaseOrderModule from '../purchaseOrderModule'
import { PurchaseOrder } from '../utils/types'

/**
 * Function used to obtain a specific purchase order based on provided module.
 * @returns Returns the specific purchase order information.
 */
const useGetPurchaseOrderDetails = (): PurchaseOrder | undefined | null => {
  const onUseGetItem = useGetItem({ module: purchaseOrderModule })
  const { item } = onUseGetItem
  return item
}

export default useGetPurchaseOrderDetails
