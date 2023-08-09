import { useWatch } from 'react-hook-form'

// TODO: Add types
// TODO: Abstract useWatch hook out or rename to hook
const getIsBillingAddressFieldDisabled = (props) => {
  const { formContext } = props
  const { control } = formContext
  const [isBillingAddressSameAsShippingAddress] = useWatch({
    control,
    name: ['is_billing_address_same_as_shipping_address'],
  })
  return isBillingAddressSameAsShippingAddress
}

export default getIsBillingAddressFieldDisabled
