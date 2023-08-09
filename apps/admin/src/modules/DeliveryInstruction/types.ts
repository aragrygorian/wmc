import { DeliveryInstruction as PrismaDeliveryInstruction } from '@prisma/client'
import { Warehouse } from '../Warehouse/types'

export interface DeliveryInstruction extends PrismaDeliveryInstruction {
  warehouse?: Warehouse
}
