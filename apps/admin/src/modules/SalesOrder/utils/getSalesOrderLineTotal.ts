import { SalesOrderLine } from '../types'
import getNetUnitPriceFromLine from '../../Quotation/utils/getNetUnitPriceFromLine'

const getSalesOrderLineTotal = (line: SalesOrderLine) => {
  const { quantity } = line
  return (quantity || 0) * getNetUnitPriceFromLine(line)
}

export default getSalesOrderLineTotal
