import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import purchaseOrderModule from '../purchaseOrderModule'
import { PurchaseOrderStatus } from './constants'

/**
 * Function used to update only the status of the purchase order.
 * This function updates the value in the db.
 *
 * @param status Updated status of the purchase order.
 * @param id ID of the purchase order to be updated.
 */
const updatePurchaseOrderStatus = (status: PurchaseOrderStatus, id: number) => {
  return supabaseClient
    .from(purchaseOrderModule.table.name)
    .update({ status })
    .match({ id })
}

export default updatePurchaseOrderStatus
