const getNetUnitPriceFromLine = ({
  retailPrice,
  discountRate,
}: {
  retailPrice?: number
  discountRate?: number
}): number => {
  return (retailPrice || 0) * (1 - (discountRate || 0))
}

export default getNetUnitPriceFromLine
