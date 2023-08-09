import { getSalespersonCostAmount } from '../../Product/productUtils'
import { Product } from '../../Product/types'

const getProductCostFromLine = (line: {
  product: Product
  discount_rate?: number | null
  quantity?: number
}) =>
  getSalespersonCostAmount({ ...line?.product, ...line?.product?.brand }) *
  (line?.quantity ?? 0)

export default getProductCostFromLine
