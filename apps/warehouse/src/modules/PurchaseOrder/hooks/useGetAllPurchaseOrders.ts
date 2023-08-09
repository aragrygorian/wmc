import { useUser } from '@gravis-os/auth'
import { fetchCrudItems } from '@gravis-os/crud'
import { PurchaseOrder as PrismaPurchaseOrder } from '@prisma/client'
import { useQuery } from 'react-query'
import purchaseOrderModule from '../purchaseOrderModule'

const useGetAllPurchaseOrders = (): PrismaPurchaseOrder[] => {
  const { user } = useUser()
  const { table } = purchaseOrderModule
  const { data } = useQuery(
    [table.name],
    () => fetchCrudItems({ module: purchaseOrderModule }),
    {
      enabled: Boolean(user),
    }
  )
  return data
}

export default useGetAllPurchaseOrders
