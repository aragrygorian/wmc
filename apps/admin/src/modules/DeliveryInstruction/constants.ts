import {
  STATUS_COMPLETED,
  STATUS_NEW,
  STATUS_VOID,
} from '@admin/constants/status'
import { StatusConfig } from '../../utils/getColorFromStatusConfig'

export const DELIVERY_INSTRUCTION_STATUS_NEW = STATUS_NEW
export const DELIVERY_INSTRUCTION_STATUS_PROCESSING = 'Processing'
export const DELIVERY_INSTRUCTION_STATUS_COMPLETED = STATUS_COMPLETED
export const DELIVERY_INSTRUCTION_STATUS_VOID = STATUS_VOID

export const DELIVERY_INSTRUCTION_STATUS_CONFIG: StatusConfig = [
  { value: DELIVERY_INSTRUCTION_STATUS_NEW, color: 'status.cyan.main' },
  { value: DELIVERY_INSTRUCTION_STATUS_PROCESSING, color: 'status.blue.main' },
  { value: DELIVERY_INSTRUCTION_STATUS_COMPLETED, color: 'status.green.main' },
  { value: DELIVERY_INSTRUCTION_STATUS_VOID, color: 'status.red.dark' },
]
