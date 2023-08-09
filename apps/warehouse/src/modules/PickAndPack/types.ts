import {
  DeliveryInstruction as PrismaPickAndPack,
  DeliveryInstructionLine as PrismaDeliveryInstructionLine,
  Product as PrismaProduct,
} from '@prisma/client'
import { DeliveryOrder } from '@warehouse/modules/DeliveryOrder/types'

export interface PickAndPackLine extends PrismaDeliveryInstructionLine {
  product?: PrismaProduct
}

export interface PickAndPack extends PrismaPickAndPack {
  delivery_order?: DeliveryOrder
  lines?: PickAndPackLine[]
}
