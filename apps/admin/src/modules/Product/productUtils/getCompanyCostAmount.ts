const getCompanyCostAmount = ({
  supplier_cost_amount: supplierCostAmount,
  margin_rate: marginRate,
  markup_rate: markupRate,
  coefficient_rate: coefficientRate = 1,
  costing_rate: costingRate,
  discount_rate: discountRate,
  additional_discount_rate: additionalDiscountRate,
}): number => {
  if (marginRate > 0 && markupRate > 1) {
    return (supplierCostAmount || 0) * (1 - (costingRate || 0))
  }
  if (!costingRate) {
    return (
      (supplierCostAmount || 0) *
      (coefficientRate || 1) *
      (1 - (discountRate || 0)) *
      (1 - (additionalDiscountRate || 0))
    )
  }
  if (!marginRate || (costingRate || 0) > (discountRate || 0)) {
    return (
      (supplierCostAmount || 0) *
      (coefficientRate || 1) *
      (1 - (costingRate || 0)) *
      (1 - (additionalDiscountRate || 0))
    )
  }
  return 0
}

export default getCompanyCostAmount
