const getBillingAddressFieldEffectByAddressKey = ({
  addressKey,
}: {
  addressKey: string
}) => {
  const isBillingAddressSameAsShippingAddressKey =
    'is_billing_address_same_as_shipping_address'
  const shippingAddressFieldKey = `shipping_address_${addressKey}`
  const billingAddressFieldKey = `billing_address_${addressKey}`

  return {
    watch: [isBillingAddressSameAsShippingAddressKey, shippingAddressFieldKey],
    setValue: ({ item, values }) => {
      const initialValue = item?.[billingAddressFieldKey] || ''
      return values[isBillingAddressSameAsShippingAddressKey]
        ? values[shippingAddressFieldKey]
        : initialValue
    },
  }
}

export default getBillingAddressFieldEffectByAddressKey
