import React from 'react'
import { useFetchCurrencyFactors } from '@admin/modules/CurrencyFactor/hooks/useFetchCurrencyFactor'
import { printAmount } from '@gravis-os/utils'
import { find } from 'lodash'

interface CurrencyConversionCellProps {
  base?: string
  currency: string
  value: number
}

const CURRENCY_SGD = 'SGD'

const CurrencyConversionCell: React.FC<CurrencyConversionCellProps> = (
  props
) => {
  const { base = CURRENCY_SGD, currency, value } = props

  const { data = [] } = useFetchCurrencyFactors({
    match: [base, currency].map((title) => ({ title })),
  })

  const baseCurrencyFactor = find(data, { title: base })
  const currencyFactor = find(data, { title: currency })

  return baseCurrencyFactor && currencyFactor ? (
    <div>
      {printAmount(
        value * (baseCurrencyFactor?.buy_rate / currencyFactor?.buy_rate)
      )}
    </div>
  ) : null
}

export default CurrencyConversionCell
