import { DeliveryOrderLine as PrismaDeliveryOrderLine } from '@prisma/client'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { deliveryOrderLineModule } from '../deliveryOrderLineConfig'

/**
 * Function used to update delivery order line based on its id.
 * This function updates the data in the db.
 *
 * @param updatedProps Modified props to update the delivery order line.
 * @param id ID of the delivery order line to be updated.
 */
export const updateDeliveryOrderLine = async (
  updatedProps: Partial<PrismaDeliveryOrderLine>,
  id: number
) => {
  return supabaseClient
    .from(deliveryOrderLineModule.table.name)
    .update({ ...updatedProps })
    .match({ id })
}
