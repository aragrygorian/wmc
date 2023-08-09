export const warehouseProductModule = {
  sk: 'slug',
  table: {
    name: 'warehouse_product',
  },
  name: {
    singular: 'Warehouse Product',
    plural: 'Warehouse Products',
  },
  select: {
    detail: '*, warehouse(*), product(*), inventory(*)',
    list: '*, warehouse(*), product(*), inventory(*, purchase_order_line_id(*)), reservation(*, order_form_line(*, order_form(*, sales_order(*, project:project_id(*)))))',
  },
}
