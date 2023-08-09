const getSalespersonCostAmount = ({
  supplier_cost_amount: supplierCostAmount,
  margin_rate: marginRate,
  markup_rate: markupRate,
  coefficient_rate: coefficientRate = 1,
  currency_factor: currencyFactor,
  discount_rate: discountRate,
  additional_discount_rate: additionaldiscountRateRate,
}): number => {
  const { buy_rate: buyRate = 1 } = currencyFactor || {}

  if (marginRate > 0 && !markupRate) {
    return Math.round((supplierCostAmount || 0) * (1 - (marginRate || 0)))
  }
  if (marginRate > 0 && markupRate > 0) {
    return Math.round(
      (supplierCostAmount || 0) * (markupRate || 0) * (1 - (marginRate || 0))
    )
  }
  if (!marginRate && markupRate > 0) {
    return Math.round(
      (supplierCostAmount || 0) *
        (coefficientRate || 1) *
        (1 - (discountRate || 0)) *
        (1 - (additionaldiscountRateRate || 0)) *
        (buyRate || 1)
    )
  }
  return 0
}

export default getSalespersonCostAmount
