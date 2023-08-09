import {
  STATUS_COMPLETED,
  STATUS_NEW,
  STATUS_PAID,
  STATUS_UNPAID,
  STATUS_VOID,
} from '@admin/constants/status'
import { StatusConfig } from '@admin/utils/getColorFromStatusConfig'

export const SHIPPING_OPTIONS = [
  'Air Freight',
  'Air Freight (Courier)',
  'Trucking',
]

export const PURCHASE_ORDER_STATUS_NEW = STATUS_NEW
export const PURCHASE_ORDER_STATUS_PAID = STATUS_PAID
export const PURCHASE_ORDER_STATUS_UNPAID = STATUS_UNPAID
export const PURCHASE_ORDER_STATUS_PENDING_PAYMENT = 'Pending Payment'
export const PURCHASE_ORDER_STATUS_COMPLETED = STATUS_COMPLETED
export const PURCHASE_ORDER_STATUS_ETA_OVERDUE = 'ETA Overdue'
export const PURCHASE_ORDER_STATUS_VOID = STATUS_VOID
export const PURCHASE_ORDER_STATUS_GOODS_RECEIVED = 'Goods Received'
export const PURCHASE_ORDER_STATUS_PENDING_STOCK_ARRIVAL =
  'Pending Stock Arrival'

export const PURCHASE_ORDER_STATUS_CONFIG: StatusConfig = [
  { value: PURCHASE_ORDER_STATUS_NEW, color: 'status.cyan.main' },
  {
    value: PURCHASE_ORDER_STATUS_PAID,
    color: 'status.blue.main',
  },
  {
    value: PURCHASE_ORDER_STATUS_UNPAID,
    color: 'status.gray.main',
  },
  {
    value: PURCHASE_ORDER_STATUS_PENDING_PAYMENT,
    color: 'status.yellow.main',
  },
  {
    value: PURCHASE_ORDER_STATUS_PENDING_STOCK_ARRIVAL,
    color: 'status.yellow.dark',
  },
  { value: PURCHASE_ORDER_STATUS_GOODS_RECEIVED, color: 'status.cyan.main' },
  { value: PURCHASE_ORDER_STATUS_COMPLETED, color: 'status.green.main' },
  { value: PURCHASE_ORDER_STATUS_ETA_OVERDUE, color: 'status.red.main' },
  { value: PURCHASE_ORDER_STATUS_VOID, color: 'status.red.dark' },
]
