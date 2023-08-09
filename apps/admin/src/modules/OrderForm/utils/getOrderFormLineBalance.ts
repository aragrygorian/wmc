import { sumBy } from 'lodash'

export const getOrderFormLineBalance = (orderFormLine) => {
  const { quantity = 0, reservation = [] } = orderFormLine

  const reserved = sumBy(reservation, 'in') - sumBy(reservation, 'out')

  return quantity - reserved
}
