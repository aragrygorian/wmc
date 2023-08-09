import {
  IS_BILLING_ADDRESS_SAME_AS_SHIPPING_ADDRESS_KEY,
  PrefixFieldKey,
} from '../constants'

const getBillingAddressFieldEffectByAddressKey = ({
  addressKey,
}: {
  addressKey: string
}) => {
  const isBillingAddressSameAsShippingAddressKey =
    IS_BILLING_ADDRESS_SAME_AS_SHIPPING_ADDRESS_KEY
  const shippingAddressFieldKey =
    PrefixFieldKey.ShippingAddress.concat(addressKey)
  const billingAddressFieldKey =
    PrefixFieldKey.BillingAddress.concat(addressKey)

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
