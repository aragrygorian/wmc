import { sumBy } from 'lodash'
import { SalesOrderLine } from '../types'

const getDeliveryOrderBalanceFromSalesOrderLine = (line: SalesOrderLine) =>
  line.quantity -
  sumBy(line.sales_order.delivery_order, ({ lines }) =>
    sumBy(
      lines?.filter(({ product_id }) => product_id === line.product_id),
      'quantity'
    )
  )

export default getDeliveryOrderBalanceFromSalesOrderLine
