import purchaseOrderModule from '@admin/modules/PurchaseOrder/purchaseOrderModule'
import { PurchaseOrder } from '@admin/modules/PurchaseOrder/types'
import { find } from '@admin/lib/useFetch/api/find'

export const findPurchaseOrder = find<PurchaseOrder>(purchaseOrderModule)
