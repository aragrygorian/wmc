import React, { useEffect } from 'react'
import { printAmount } from '@gravis-os/utils'
import { StatStack } from '@gravis-os/ui'
import { useWatch } from 'react-hook-form'
import { compact } from 'lodash'
import {
  getTotalFromPricing,
  getTaxAmount,
  getNetUnitPriceFromLine,
} from '../utils'

// TODO: Add types
const TotalDisplayField = (props) => {
  const { formContext } = props
  const { control, setValue } = formContext || {}
  const [
    lines,
    discount_rate,
    shipping = 0,
    tax = 0,
    total = 0,
    currencyFactor,
    currencyRate = 1,
  ] = useWatch({
    control,
    name: [
      'lines',
      'discount_rate',
      'shipping',
      'tax',
      'total',
      'currency_factor_id',
      'currency_rate',
    ],
  })

  const nextSubtotal = (lines || []).reduce((acc, line) => {
    const { quantity } = line
    const unitPriceValue = getNetUnitPriceFromLine(line) * currencyRate
    const quantityValue = parseFloat(quantity)
    if (Number.isNaN(unitPriceValue) || Number.isNaN(quantityValue)) return acc
    return acc + unitPriceValue * quantityValue
  }, 0)

  const nextDiscountRate =
    !discount_rate || Number.isNaN(discount_rate) ? 1 : 1 - discount_rate
  const nextTax = getTaxAmount(nextSubtotal * nextDiscountRate + shipping)

  // Effects
  useEffect(() => {
    setValue('tax', nextTax)
  }, [nextTax])

  useEffect(() => {
    setValue('subtotal', nextSubtotal)
  }, [nextSubtotal])

  useEffect(() => {
    setValue(
      'total',
      getTotalFromPricing({
        subtotal: nextSubtotal,
        discount_rate: nextDiscountRate,
        shipping,
        tax: nextTax,
      })
    )
  }, [nextSubtotal, discount_rate, shipping, tax])

  return (
    <StatStack
      items={[
        {
          key: 'total',
          title: compact([currencyFactor?.title, printAmount(total)]).join(' '),
          overline: 'Amount',
        },
      ]}
      size="large"
      titleTypographyProps={{ variant: 'h1' }}
      justifyContent="flex-end"
      sx={{ textAlign: 'right' }}
    />
  )
}

export default TotalDisplayField
