import { StatusConfig } from '../../utils/getColorFromStatusConfig'
import {
  STATUS_NEW,
  STATUS_OVERDUE,
  STATUS_PAID,
  STATUS_PENDING,
  STATUS_UNPAID,
  STATUS_VOID,
} from '../../constants/status'

export const INVOICE_USER_TYPE_ASSIGNEE = 'Assignee'

export const enum InvoiceType {
  LumpSum = 'Lump Sum',
  Itemised = 'Itemised',
}

export const INVOICE_STATUS_NEW = STATUS_NEW
export const INVOICE_STATUS_PAID = STATUS_PAID
export const INVOICE_STATUS_PENDING = STATUS_PENDING
export const INVOICE_STATUS_UNPAID = STATUS_UNPAID
export const INVOICE_STATUS_OVERDUE = STATUS_OVERDUE
export const INVOICE_STATUS_VOID = STATUS_VOID

export const INVOICE_TYPE_OPTIONS = [InvoiceType.Itemised, InvoiceType.LumpSum]

export const INVOICE_STATUS_CONFIG: StatusConfig = [
  { value: INVOICE_STATUS_NEW, color: 'status.cyan.main' },
  { value: INVOICE_STATUS_PENDING, color: 'status.green.main' },
  { value: INVOICE_STATUS_PAID, color: 'status.blue.main' },
  { value: INVOICE_STATUS_UNPAID, color: 'status.gray.main' },
  { value: INVOICE_STATUS_OVERDUE, color: 'status.red.main' },
  { value: INVOICE_STATUS_VOID, color: 'status.red.dark' },
]
