const getDiscountedValue = ({
  value,
  discountRate,
  discount,
  isDiscountRate = true,
}: {
  value?: number | null
  discountRate?: number | null
  discount?: number | null
  isDiscountRate?: boolean | null
}) => {
  return isDiscountRate
    ? (value || 0) * (1 - (discountRate || 0))
    : (value || 0) - (discount || 0)
}

export default getDiscountedValue
