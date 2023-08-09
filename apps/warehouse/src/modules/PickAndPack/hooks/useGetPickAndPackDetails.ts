import { useGetItem } from '@gravis-os/crud'
import { pickAndPackModule } from '../pickAndPackModule'
import { PickAndPack } from '../types'

/**
 * Function used to obtain a specific pick and pack based on provided module.
 * @returns Returns the specific pick and pack information
 */
const useGetPickAndPackDetails = (): PickAndPack | undefined | null => {
  const onUseGetItem = useGetItem({ module: pickAndPackModule })
  const { item } = onUseGetItem
  return item
}

export default useGetPickAndPackDetails
