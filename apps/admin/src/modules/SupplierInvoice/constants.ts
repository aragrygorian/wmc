import {
  STATUS_NEW,
  STATUS_OVERDUE,
  STATUS_PAID,
  STATUS_UNPAID,
} from '@admin/constants/status'
import { StatusConfig } from '../../utils/getColorFromStatusConfig'

export const SUPPLIER_INVOICE_USER_TYPE_ASSIGNEE = 'Assignee'

export const SUPPLIER_INVOICE_STATUS_NEW = STATUS_NEW
export const SUPPLIER_INVOICE_STATUS_PAID = STATUS_PAID
export const SUPPLIER_INVOICE_STATUS_UNPAID = STATUS_UNPAID
export const SUPPLIER_INVOICE_STATUS_OVERDUE = STATUS_OVERDUE

export const SUPPLIER_INVOICE_STATUS_CONFIG: StatusConfig = [
  { value: SUPPLIER_INVOICE_STATUS_NEW, color: 'status.cyan.main' },
  { value: SUPPLIER_INVOICE_STATUS_UNPAID, color: 'status.gray.main' },
  { value: SUPPLIER_INVOICE_STATUS_PAID, color: 'status.green.main' },
  { value: SUPPLIER_INVOICE_STATUS_OVERDUE, color: 'status.red.main' },
]
