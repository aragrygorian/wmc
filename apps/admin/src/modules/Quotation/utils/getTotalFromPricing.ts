// TODO: Add types
const getTotalFromPricing = (props) => {
  const {
    subtotal,
    discount_rate = 1,
    shipping = 0,
    tax = 0,
    decimalPlaces = 2,
  } = props
  const total = subtotal * discount_rate + shipping + tax

  return parseFloat(total).toFixed(decimalPlaces)
}

export default getTotalFromPricing
