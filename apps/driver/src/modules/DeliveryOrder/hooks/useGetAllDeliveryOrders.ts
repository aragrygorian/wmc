import useUser from '@driver/app/useUser'
import { fetchCrudItems } from '@gravis-os/crud'
import { useQuery } from 'react-query'
import { deliveryOrderModule } from '../deliveryOrderConfig'
import { DeliveryOrder } from '../types'

/**
 * Function used to obtain all delivery orders in the database.
 * The data obtained is based on the delivery order module for the driver mobile app.
 */
const useGetAllDeliveryOrders = (): DeliveryOrder[] => {
  const { user } = useUser()
  const { table } = deliveryOrderModule
  const { data } = useQuery(
    [table.name],
    () => fetchCrudItems({ module: deliveryOrderModule }),
    {
      enabled: Boolean(user),
    }
  )
  return data
}

export default useGetAllDeliveryOrders
