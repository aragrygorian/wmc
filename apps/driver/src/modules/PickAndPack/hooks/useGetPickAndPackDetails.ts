import { useGetItem } from '@gravis-os/crud'
import { pickAndPackModule } from '../pickAndPackConfig'
import { PickAndPack } from '../types'

/**
 * Function used to obtain a specific delivery order based on provided module.
 * @returns Returns the specific de
 */
const useGetPickAndPackDetails = (): PickAndPack | undefined | null => {
  const onUseGetItem = useGetItem({ module: pickAndPackModule })
  const { item } = onUseGetItem
  return item
}

export default useGetPickAndPackDetails
