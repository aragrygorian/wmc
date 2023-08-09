import {
  STATUS_ACCEPTED,
  STATUS_NEW,
  STATUS_PENDING,
  STATUS_PENDING_APPROVAL,
  STATUS_REJECTED,
  STATUS_REVISED,
  STATUS_VOID,
} from '../../constants/status'
import { StatusConfig } from '../../utils/getColorFromStatusConfig'

export const QUOTATION_STATUS_NEW = STATUS_NEW
export const QUOTATION_STATUS_PENDING = STATUS_PENDING
export const QUOTATION_STATUS_PENDING_APPROVAL = STATUS_PENDING_APPROVAL
export const QUOTATION_STATUS_REJECTED = STATUS_REJECTED
export const QUOTATION_STATUS_ACCEPTED = STATUS_ACCEPTED
export const QUOTATION_STATUS_REVISED = STATUS_REVISED
export const QUOTATION_STATUS_VOID = STATUS_VOID

export const QUOTATION_STATUS_CONFIG: StatusConfig = [
  { value: QUOTATION_STATUS_NEW, color: 'status.cyan.main' },
  { value: QUOTATION_STATUS_PENDING, color: 'status.blue.main' },
  { value: QUOTATION_STATUS_PENDING_APPROVAL, color: 'status.yellow.dark' },
  { value: QUOTATION_STATUS_REJECTED, color: 'status.red.main' },
  { value: QUOTATION_STATUS_ACCEPTED, color: 'status.green.main' },
  { value: QUOTATION_STATUS_REVISED, color: 'status.yellow.main' },
  { value: QUOTATION_STATUS_VOID, color: 'status.gray.main' },
]

export const QUOTATION_LINE_STATUS_PENDING_APPROVAL = STATUS_PENDING_APPROVAL
export const QUOTATION_LINE_STATUS_REJECTED = STATUS_REJECTED
export const QUOTATION_LINE_STATUS_ACCEPTED = STATUS_ACCEPTED

export const enum QuotationType {
  Standard = 'Standard',
  IronMongery = 'Ironmongery',
}

export const QUOTATION_SUBTOTAL_KEY = 'subtotal'
export const QUOTATION_LINES_KEY = 'lines'

/* Ironmongery */
export const DOOR_TYPE_OPTIONS = ['Double Leaf', 'Single Leaf']
export const DOOR_MATERIAL_OPTIONS = [
  'Glass',
  'Timber',
  'Steel',
  'PVC',
  'Fiberglass',
  'Aluminium',
]
export const DOOR_HARDWARE_OPTIONS = [
  'Pivot',
  'Hinge',
  'Shower Hinger',
  'Pocket Sliding',
  'Glass Hinge',
]
