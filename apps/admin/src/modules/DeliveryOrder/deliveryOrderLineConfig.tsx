import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'

export const deliveryOrderLineModule = {
  sk: 'slug',
  table: {
    name: 'delivery_order_line',
  },
  name: {
    singular: 'Delivery Order Line',
    plural: 'Delivery Order Lines',
  },
  route: {
    plural: 'Delivery Order Lines',
  },
  select: {
    list: '*, product:product_id(model_code, title), delivery_order!inner(*, sales_order!inner(title))',
    detail:
      '*, delivery_order(*, project(*, project_brand!project_id(*), brand(*)))',
  },
  Icon: CategoryOutlinedIcon,
}
