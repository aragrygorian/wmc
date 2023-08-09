import {
  DeliveryInstruction as PrismaPickAndPack,
  Warehouse as PrismaWarehouse,
} from '@prisma/client'

/** Warehouse object used in driver mobile app. */
export interface Warehouse extends PrismaWarehouse {
  pick_and_packs?: PrismaPickAndPack[]
}
