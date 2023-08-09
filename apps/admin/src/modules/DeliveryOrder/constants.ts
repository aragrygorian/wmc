import {
  STATUS_DELIVERED,
  STATUS_NEW,
  STATUS_PENDING_DELIVERY,
  STATUS_VOID,
} from '@admin/constants/status'
import { StatusConfig } from '../../utils/getColorFromStatusConfig'

export const DELIVERY_ORDER_STATUS_NEW = STATUS_NEW
export const DELIVERY_ORDER_STATUS_PENDING_DELIVERY = STATUS_PENDING_DELIVERY
export const DELIVERY_ORDER_STATUS_DELIVERED = STATUS_DELIVERED
export const DELIVERY_ORDER_STATUS_VOID = STATUS_VOID

export const DELIVERY_ORDER_STATUS_CONFIG: StatusConfig = [
  { value: DELIVERY_ORDER_STATUS_NEW, color: 'status.cyan.main' },
  { value: DELIVERY_ORDER_STATUS_PENDING_DELIVERY, color: 'status.blue.main' },
  { value: DELIVERY_ORDER_STATUS_DELIVERED, color: 'status.green.main' },
  { value: DELIVERY_ORDER_STATUS_VOID, color: 'status.red.dark' },
]
