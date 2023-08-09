import { DeliveryInstruction } from '@prisma/client'
import { routes } from '@admin/app/routes'
import PostAddIcon from '@mui/icons-material/PostAdd'

export const deliveryInstructionModule = {
  sk: 'slug' as keyof DeliveryInstruction,
  table: {
    name: 'delivery_instruction',
  },
  name: {
    singular: 'Pick & Pack',
    plural: 'Pick & Pack',
  },
  route: {
    plural: routes.DELIVERY_INSTRUCTIONS,
  },
  relations: {
    lines: { table: { name: 'delivery_instruction_line' } },
  },
  select: {
    list: '*, delivery_order(*, project(*)), warehouse(*)',
    detail:
      '*, delivery_order(*, project(*)), lines:delivery_instruction_line(*, product:product_id(*)), warehouse(*)',
  },
  Icon: PostAddIcon,
}
