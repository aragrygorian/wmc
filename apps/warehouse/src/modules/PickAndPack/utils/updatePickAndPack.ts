import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { PickAndPackStatus } from '../constants'
import { pickAndPackModule } from '../pickAndPackModule'

/**
 * Function used to update only the status of the pick and pack.
 * This function updates the value in the db.
 *
 * @param newStatus Updated status of the pick and pack.
 * @param id ID of the pick and pack to be updated.
 */
export const updatePickAndPackStatus = (
  newStatus: PickAndPackStatus,
  id: number
) => {
  return supabaseClient
    .from(pickAndPackModule.table.name)
    .update({ status: newStatus })
    .match({ id })
}
