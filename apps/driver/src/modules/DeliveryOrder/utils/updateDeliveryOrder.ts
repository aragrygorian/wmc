import { DeliveryOrder as PrismaDeliveryOrder } from '@prisma/client'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { DeliveryOrderStatus } from '../constants'
import { deliveryOrderModule } from '../deliveryOrderConfig'

/**
 * Function used to update only the status of the delivery order.
 * This function updates the value in the db.
 *
 * @param newStatus Updated status of the delivery order.
 * @param id ID of the delivery order to be updated.
 */
export const updateDeliveryOrderStatus = async (
  newStatus: DeliveryOrderStatus,
  id: number
) => {
  return supabaseClient
    .from(deliveryOrderModule.table.name)
    .update({ status: newStatus })
    .match({ id })
}

/**
 * Function used to update the delivery order based on given props.
 * This function updates the value in the db.
 *
 * @param updatedProps Props which updates the delivery order.
 * @param id ID of the delivery order to be updated.
 */
export const updateDeliveryOrder = async (
  updatedProps: Partial<PrismaDeliveryOrder>,
  id: number
) => {
  return supabaseClient
    .from(deliveryOrderModule.table.name)
    .update({ ...updatedProps })
    .match({ id })
}
