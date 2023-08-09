import {
  CurrencyFactor as PrismaCurrencyFactor,
  ProjectCurrencyFactor as PrismaProjectCurrencyFactor,
} from '@prisma/client'

export interface CurrencyFactor extends PrismaCurrencyFactor {
  project_currency_factor: PrismaProjectCurrencyFactor[]
}
