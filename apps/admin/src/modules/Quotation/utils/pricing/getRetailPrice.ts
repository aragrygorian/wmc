const getRetailPrice = ({
  supplierCostAmount,
  salesPersonCost,
  markupRate,
  marginRate,
}: {
  supplierCostAmount?: number
  salesPersonCost?: number
  markupRate?: number
  marginRate?: number
}): number => {
  if (marginRate) return supplierCostAmount || 0
  return (salesPersonCost || 0) * (markupRate || 1)
}

export default getRetailPrice
