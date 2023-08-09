import { StatusConfig } from '../../utils/getColorFromStatusConfig'

export const WAREHOUSE_STATUS_INSTOCK = 'Instock'
export const WAREHOUSE_STATUS_OUT_OF_STOCK = 'Out of Stock'

export const WAREHOUSE_STATUS_CONFIG: StatusConfig = [
  { value: WAREHOUSE_STATUS_INSTOCK, color: 'status.cyan.main' },
  { value: WAREHOUSE_STATUS_OUT_OF_STOCK, color: 'status.red.main' },
]
