const getTotalFromDebitNoteLine = (line: {
  quantity: number
  unit_price?: number
  discount_rate?: number
}) =>
  (line?.unit_price ?? 0) * line?.quantity * (1 - (line?.discount_rate ?? 0))

export default getTotalFromDebitNoteLine
