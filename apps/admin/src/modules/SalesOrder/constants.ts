import {
  STATUS_COMPLETED,
  STATUS_NEW,
  STATUS_ONGOING,
  STATUS_PENDING_DELIVERY,
  STATUS_VOID,
} from '@admin/constants/status'
import { StatusConfig } from '../../utils/getColorFromStatusConfig'

export const SALES_ORDER_STATUS_NEW = STATUS_NEW
export const SALES_ORDER_STATUS_ONGOING = STATUS_ONGOING
export const SALES_ORDER_STATUS_PENDING_DELIVERY = STATUS_PENDING_DELIVERY
export const SALES_ORDER_STATUS_COMPLETED = STATUS_COMPLETED
export const SALES_ORDER_STATUS_VOID = STATUS_VOID

export const SALES_ORDER_STATUS_CONFIG: StatusConfig = [
  { value: SALES_ORDER_STATUS_NEW, color: 'status.cyan.main' },
  { value: SALES_ORDER_STATUS_ONGOING, color: 'status.yellow.main' },
  { value: SALES_ORDER_STATUS_PENDING_DELIVERY, color: 'status.blue.main' },
  { value: SALES_ORDER_STATUS_COMPLETED, color: 'status.green.main' },
  { value: SALES_ORDER_STATUS_VOID, color: 'status.red.main' },
]
