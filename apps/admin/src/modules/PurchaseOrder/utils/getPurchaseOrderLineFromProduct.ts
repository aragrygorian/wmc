import { Product } from '../../Product/types'
import { PurchaseOrderLine } from '../types'

const getPurchaseOrderLineFromProduct = ({
  id,
  quantity,
  ...product
}: Product & { quantity: number }): Partial<PurchaseOrderLine> => ({
  quantity,
  product_id: id,
  product: { id, ...product },
})

export default getPurchaseOrderLineFromProduct
