import { useGetItem } from '@gravis-os/crud'
import { Warehouse } from '../types'
import { warehouseModule } from '../warehouseConfig'

/**
 * Function used to obtain a specific warehouse details based on provided module.
 * @returns Returns the specific warehouse information.
 */
const useGetWarehouseDetails = (): Warehouse | undefined | null => {
  const onUseGetItem = useGetItem({ module: warehouseModule })
  const { item } = onUseGetItem
  return item
}

export default useGetWarehouseDetails
