import { useUser } from '@gravis-os/auth'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { find, values } from 'lodash'
import { useQuery } from 'react-query'
import inventoryModule from '../inventoryModule'

/**
 * Function used to find supplier reference number based on given purchase order ID.
 *
 * It fetches a list of supplier reference number which matches the current given purchase order line ID,
 * and returns the first item found on the list.
 * @param purchaseOrderLineId ID of the purchase order line.
 * @returns Supplier reference number.
 */
const useGetSupplierReferenceNo = (
  purchaseOrderLineId: number | undefined | null
) => {
  // User
  const user = useUser()

  // Method
  const getReferenceNumber = async () => {
    const onReferenceNumberQuery = await supabaseClient
      .from(inventoryModule.table.name)
      .select('ref_no')
      .match({ purchase_order_line_id: purchaseOrderLineId })
      .single()
    const { data, error } = onReferenceNumberQuery
    if (error) {
      throw new Error('Error when fetching supplier reference number.')
    }
    return data
  }

  // Fetch
  const onUseQuery = useQuery(
    [purchaseOrderLineId],
    () => getReferenceNumber(),
    { enabled: Boolean(user && purchaseOrderLineId) }
  )
  const { data, error } = onUseQuery

  if (error) {
    throw new Error('Error when querying reference number information.')
  }

  // Return first data
  return find(values(data), Boolean)
}

export default useGetSupplierReferenceNo
