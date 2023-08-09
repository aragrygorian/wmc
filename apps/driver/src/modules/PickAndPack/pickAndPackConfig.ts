import PostAddIcon from '@mui/icons-material/PostAdd'
import { DeliveryInstruction as PrismaPickAndPack } from '@prisma/client'

/** Delivery instruction module used specifically for the Driver mobile app. */
export const pickAndPackModule = {
  sk: 'slug' as keyof PrismaPickAndPack,
  table: {
    name: 'delivery_instruction',
  },
  name: {
    singular: 'Pick & Pack',
    plural: 'Pick & Pack',
  },
  relations: {
    lines: { table: { name: 'delivery_instruction_line' } },
  },
  select: {
    list: '*, warehouse(*)',
    detail:
      '*, delivery_order(*, project(*)), lines:delivery_instruction_line(*, product:product_id(*)), warehouse(*)',
  },
  Icon: PostAddIcon,
}
