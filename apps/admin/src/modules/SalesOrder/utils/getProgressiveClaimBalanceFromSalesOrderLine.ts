import { sumBy } from 'lodash'
import { SalesOrderLine } from '../types'

const getProgressiveClaimBalanceFromSalesOrderLine = (line: SalesOrderLine) =>
  line.quantity - sumBy(line.progressive_claim_line, 'approved_quantity')

export default getProgressiveClaimBalanceFromSalesOrderLine
