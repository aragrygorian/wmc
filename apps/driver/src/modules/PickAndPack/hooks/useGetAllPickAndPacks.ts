import { useUser } from '@gravis-os/auth'
import { fetchCrudItems } from '@gravis-os/crud'
import { useQuery } from 'react-query'
import { pickAndPackModule } from '../pickAndPackConfig'
import { PickAndPack } from '../types'

/**
 * Function used to obtain all delivery instructions in the database.
 * The data obtained in based on the delivery instruction module for the driver mobile app.
 * @returns List of delivery instructions.
 */
const useGetAllPickAndPacks = (): PickAndPack[] => {
  const { user } = useUser()
  const { table } = pickAndPackModule
  const { data } = useQuery(
    [table.name],
    () => fetchCrudItems({ module: pickAndPackModule }),
    {
      enabled: Boolean(user),
    }
  )
  return data
}

export default useGetAllPickAndPacks
