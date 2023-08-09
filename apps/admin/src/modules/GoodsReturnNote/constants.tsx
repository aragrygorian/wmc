import { STATUS_PENDING, STATUS_RETURNED } from '@admin/constants/status'
import { StatusConfig } from '@admin/utils/getColorFromStatusConfig'

export const GOODS_RETURN_NOTE_STATUS_PENDING = STATUS_PENDING
export const GOODS_RETURN_NOTE_STATUS_RETURNED = STATUS_RETURNED

export const GOODS_RETURN_NOTE_STATUS_CONFIG: StatusConfig = [
  { value: GOODS_RETURN_NOTE_STATUS_PENDING, color: 'status.blue.main' },
  { value: GOODS_RETURN_NOTE_STATUS_RETURNED, color: 'status.green.main' },
]
