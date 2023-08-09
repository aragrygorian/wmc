import {
  DeliveryOrder as PrismaDeliveryOrder,
  Project as PrismaProject,
} from '@prisma/client'

export interface DeliveryOrder extends PrismaDeliveryOrder {
  project?: PrismaProject
}
