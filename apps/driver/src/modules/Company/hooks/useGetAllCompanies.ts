import { useUser } from '@gravis-os/auth'
import { fetchCrudItems } from '@gravis-os/crud'
import { Company as PrismaCompany } from '@prisma/client'
import { useQuery } from 'react-query'
import { companyModule } from '../companyConfig'

/**
 * Function used to obtain all companies in the database.
 * The data obtained is based on the company module for the driver mobile app.
 */
const useGetAllCompanies = (): PrismaCompany[] => {
  const { user } = useUser()
  const { table } = companyModule
  const { data } = useQuery(
    [table.name],
    () => fetchCrudItems({ module: companyModule }),
    {
      enabled: Boolean(user),
    }
  )
  return data
}

export default useGetAllCompanies
