import { QuotationLine } from '../types'
import getNetUnitPriceFromLine from './getNetUnitPriceFromLine'

const getQuotationLineTotal = (quotationLine: QuotationLine) => {
  const { quantity } = quotationLine
  return (quantity || 0) * getNetUnitPriceFromLine(quotationLine)
}

export default getQuotationLineTotal
