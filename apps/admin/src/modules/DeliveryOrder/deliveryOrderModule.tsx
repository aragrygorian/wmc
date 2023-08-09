import { routes } from '@admin/app/routes'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'

export const deliveryOrderModule = {
  sk: 'slug',
  table: {
    name: 'delivery_order',
  },
  name: {
    singular: 'Delivery Order',
    plural: 'Delivery Orders',
  },
  route: {
    plural: routes.DELIVERY_ORDERS,
  },
  relations: {
    lines: { table: { name: 'delivery_order_line' } },
  },
  select: {
    list: `*, delivery_instruction(*), project(id, title, slug), company(id, title, slug), contact(id, title, slug), 
            lines:delivery_order_line(
              *, 
              product(*, 
                brand(*, currency_factor(title, buy_rate, sell_rate), company:company_id(title, slug)),
                category(title)
              )
            )`,
    detail: `*, 
             assignee:assignee_id(*),
             driver:driver_id(*),
             project(*),
             company(*), 
             contact(*),
             sales_order:sales_order_id(
               *, lines:sales_order_line(*, product:product_id(*))
              )`,
  },
  Icon: LocalShippingOutlinedIcon,
}
