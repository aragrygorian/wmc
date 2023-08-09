import { routes } from '@driver/app/routes'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'

/** Delivery Order module for mobile driver app */
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
    plural: routes.DELIVERY_ORDER,
  },
  relations: {
    lines: { table: { name: 'delivery_order_line' } },
    user_ids: { table: { name: 'delivery_order_user' } },
  },
  select: {
    list: '*, pick_and_packs:delivery_instruction(*, warehouse(id, title, slug, pick_and_packs:delivery_instruction(*)))',
    detail: `*, project(*), company(*), contact(*), lines:delivery_order_line(*, product(*, 
                 brand(*, company:company_id(title, slug)),
                 category(title)
               )
             )
            `,
  },
  Icon: LocalShippingOutlinedIcon,
}
