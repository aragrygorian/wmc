export const extractIronmongeryProductWithId = (
  object: Record<string, unknown>
) => {
  const {
    id,
    quantity,
    discount_rate: discountRate,
    index,
    product,
    part_no: partNo,
  } = object || {}
  return {
    id,
    quantity,
    discount_rate: discountRate,
    index,
    product,
    part_no: partNo,
  }
}
