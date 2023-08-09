import { SalesOrderLine } from '../../SalesOrder/types'
import { DeliveryOrderLine } from '../types'

const getDeliveryOrderLineFromSaleOrderLine = ({
  quantity,
  product_id,
  product,
}: SalesOrderLine): Pick<
  DeliveryOrderLine,
  'quantity' | 'product_id' | 'product'
> => ({
  quantity,
  product_id,
  product,
})

export default getDeliveryOrderLineFromSaleOrderLine
