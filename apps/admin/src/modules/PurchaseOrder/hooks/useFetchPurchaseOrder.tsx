import purchaseOrderModule from '@admin/modules/PurchaseOrder/purchaseOrderModule'
import { PurchaseOrder } from '@admin/modules/PurchaseOrder/types'
import { initUseFetch, initUseFetchCount } from '@admin/lib/useFetch'

export const useFetchPurchaseOrders =
  initUseFetch<PurchaseOrder>(purchaseOrderModule)

export const useFetchPurchaseOrderCount = initUseFetchCount(purchaseOrderModule)
