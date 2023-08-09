import PostAddIcon from '@mui/icons-material/PostAdd'
import { DeliveryInstruction as PrismaDeliveryInstruction } from '@prisma/client'
import { routes } from '@warehouse/app/routes'

export const pickAndPackModule = {
  sk: 'slug' as keyof PrismaDeliveryInstruction,
  table: {
    name: 'delivery_instruction',
  },
  name: {
    singular: 'Pick & Pack',
    plural: 'Pick & Pack',
  },
  route: {
    plural: routes.PICK_AND_PACK,
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
