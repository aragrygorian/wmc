import { PurchaseOrderLine } from '@admin/modules/PurchaseOrder/types'
import { initUseFetch, initUseFetchCount } from '@admin/lib/useFetch'
import { purchaseOrderLineModule } from '@admin/modules/PurchaseOrder/purchaseOrderLineConfig'

export const useFetchPurchaseOrderLines = initUseFetch<PurchaseOrderLine>(
  purchaseOrderLineModule
)

export const useFetchPurchaseOrderLineCount = initUseFetchCount(
  purchaseOrderLineModule
)
