import { sumBy } from 'lodash'
import { SalesOrderLine } from '../types'

const getOrderFormBalanceFromSalesOrderLine = (line: SalesOrderLine) =>
  line.quantity -
  sumBy(line.sales_order.order_form, ({ lines }) =>
    sumBy(
      lines?.filter(({ product_id }) => product_id === line.product_id),
      'quantity'
    )
  )

export default getOrderFormBalanceFromSalesOrderLine
