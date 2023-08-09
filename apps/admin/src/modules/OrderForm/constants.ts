import {
  STATUS_COMPLETED,
  STATUS_NEW,
  STATUS_OVERDUE,
  STATUS_VOID,
} from '@admin/constants/status'
import { StatusConfig } from '@admin/utils/getColorFromStatusConfig'

export const ORDER_FORM_STATUS_NEW = STATUS_NEW
export const ORDER_FORM_STATUS_PENDING_PURCHASE_ORDER = 'Pending Purchase Order'
export const ORDER_FORM_STATUS_PENDING_STOCK_ARRIVAL = 'Pending Stock Arrival'
export const ORDER_FORM_STATUS_COMPLETED = STATUS_COMPLETED
export const ORDER_FORM_STATUS_OVERDUE = STATUS_OVERDUE
export const ORDER_FORM_STATUS_VOID = STATUS_VOID

export const ORDER_FORM_STATUS_CONFIG: StatusConfig = [
  { value: ORDER_FORM_STATUS_NEW, color: 'status.cyan.main' },
  {
    value: ORDER_FORM_STATUS_PENDING_PURCHASE_ORDER,
    color: 'status.yellow.main',
  },
  { value: ORDER_FORM_STATUS_PENDING_STOCK_ARRIVAL, color: 'status.blue.main' },
  { value: ORDER_FORM_STATUS_COMPLETED, color: 'status.green.main' },
  { value: ORDER_FORM_STATUS_OVERDUE, color: 'status.red.main' },
  { value: ORDER_FORM_STATUS_VOID, color: 'status.red.dark' },
]
