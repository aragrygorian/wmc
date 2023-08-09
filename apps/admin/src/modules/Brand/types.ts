import { Brand as PrismaBrand } from '@prisma/client'
import { CurrencyFactor } from '../CurrencyFactor/types'

export interface Brand extends PrismaBrand {
  currency_factor: CurrencyFactor
}
