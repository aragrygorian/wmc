import { DeliveryOrder } from '@driver/modules/DeliveryOrder/types'
import { PickAndPackLine } from '@driver/modules/PickAndPackLine/types'
import {
  DeliveryInstruction as PrismaPickAndPack,
  Warehouse as PrismaWarehouse,
} from '@prisma/client'

export interface PickAndPack extends PrismaPickAndPack {
  warehouse?: PrismaWarehouse
  delivery_order?: DeliveryOrder
  lines?: PickAndPackLine[]
}

export const enum PickAndPackStatus {
  New = 'New',
  Processing = 'Processing',
  Completed = 'Completed',
  Void = 'Void',
  ReadyForCollection = 'Ready for Collection',
}
