import { first, orderBy, sumBy } from 'lodash'
import { SalesOrderLine } from '../../SalesOrder/types'
import { ProgressiveClaimLine } from '../types'

const getProgressiveClaimLineFromSalesOrderLine = (
  salesOrderLine: SalesOrderLine
): Partial<
  ProgressiveClaimLine & {
    previous_quantity?: number
    accumulated_quantity?: number
  }
> => {
  const {
    id,
    position,
    quantity,
    unit_price,
    product_id,
    product,
    progressive_claim_line: progressiveClaimLines,
  } = salesOrderLine
  const previous_quantity =
    first(orderBy(progressiveClaimLines, 'created_at', 'desc'))
      ?.approved_quantity ?? 0
  const accumulated_quantity = sumBy(progressiveClaimLines, 'approved_quantity')
  return {
    position,
    quantity,
    approved_quantity: 0,
    unit_price,
    product_id,
    product,
    sales_order_line_id: id,
    sales_order_line: salesOrderLine,
    previous_quantity,
    accumulated_quantity,
  }
}

export default getProgressiveClaimLineFromSalesOrderLine
