import { OrderFormLine } from '../../OrderForm/types'
import { PurchaseOrderLine } from '../types'

const getPurchaseOrderLineFromOrderFormLine = ({
  id,
  quantity,
  product_id,
  product,
  ...order_form_line
}: OrderFormLine): Partial<PurchaseOrderLine> => ({
  quantity,
  order_form_line_id: id,
  order_form_line: {
    id,
    product_id,
    product,
    quantity,
    ...order_form_line,
  },
  product_id,
  product,
})

export default getPurchaseOrderLineFromOrderFormLine
