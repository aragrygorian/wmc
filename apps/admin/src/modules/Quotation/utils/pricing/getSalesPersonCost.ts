const getSalespersonCost = ({
  supplierCostAmount,
  marginRate,
  coefficientRate,
  currencyFactor,
  discountRate,
  additionalDiscountRate,
  handlingRate,
}: {
  supplierCostAmount?: number
  marginRate?: number
  coefficientRate?: number
  currencyFactor?: { buy_rate: number }
  discountRate?: number
  additionalDiscountRate?: number
  handlingRate?: number
  specialUnitRate?: number
}): number => {
  const { buy_rate: buyRate } = currencyFactor || {}

  if (marginRate) return (supplierCostAmount || 0) * (1 - marginRate)

  return (
    (supplierCostAmount || 0) *
    (coefficientRate || 1) *
    (buyRate || 1) *
    (handlingRate || 1) *
    (1 - (discountRate || 0)) *
    (1 - (additionalDiscountRate || 0))
  )
}

export default getSalespersonCost
