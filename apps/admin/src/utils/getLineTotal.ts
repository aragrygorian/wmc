interface Line {
  unit_price?: number | null
  quantity?: number | null
  discount_rate?: number | null
}

const getLineTotal = ({
  unit_price: unitPrice,
  quantity,
  discount_rate: discountRate,
}: Line) => (unitPrice || 0) * (quantity || 0) * (1 - (discountRate || 0))

export default getLineTotal
