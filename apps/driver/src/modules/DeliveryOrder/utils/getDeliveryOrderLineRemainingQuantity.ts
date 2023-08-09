import { subtract } from 'lodash'
import { DeliveryOrderLine } from '../types'

const getDeliveryOrderLineRemainingQuantity = (
  deliveryOrderLine?: DeliveryOrderLine
) => {
  if (!deliveryOrderLine) return 0
  return subtract(
    deliveryOrderLine.quantity,
    deliveryOrderLine.delivered_quantity ?? 0
  )
}

export default getDeliveryOrderLineRemainingQuantity
