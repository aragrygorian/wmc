import {
  DeliveryInstructionLine as PrismaPickAndPackLine,
  Product as PrismaProduct,
} from '@prisma/client'

export interface PickAndPackLine extends PrismaPickAndPackLine {
  product?: PrismaProduct
}
