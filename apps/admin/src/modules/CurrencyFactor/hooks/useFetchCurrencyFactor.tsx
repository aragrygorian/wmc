import { initUseFetch } from '@admin/lib/useFetch'
import { currencyFactorModule } from '@admin/modules/CurrencyFactor/currencyFactorConfig'
import { CurrencyFactor } from '@admin/modules/CurrencyFactor/types'
import initUseFetchCount from '../../../lib/useFetch/useFetchCount'

export const useFetchCurrencyFactors =
  initUseFetch<CurrencyFactor>(currencyFactorModule)

export const useFetchCurrencyFactorCount =
  initUseFetchCount(currencyFactorModule)
