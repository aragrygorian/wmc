import { useUser } from '@gravis-os/auth'
import { fetchCrudItems } from '@gravis-os/crud'
import { useQuery } from 'react-query'
import { pickAndPackModule } from '../pickAndPackModule'
import { PickAndPack } from '../types'

/**
 * Function used to obtain all pick and packs in the database.
 * The data obtained is based on the pick and pack module for the warehouse mobile app.
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
