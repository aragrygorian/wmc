import { getNetUnitPriceFromLine } from './index'
import { Product } from '../../Product/types'

const getSubtotalFromLine = (line: {
  product: Product
  discount_rate: number | null
  quantity?: number
}) => getNetUnitPriceFromLine(line) * (line?.quantity ?? 0)

export default getSubtotalFromLine
