import { useWatch } from 'react-hook-form'
import { IS_BILLING_ADDRESS_SAME_AS_SHIPPING_ADDRESS_KEY } from '../constants'

const getIsBillingAddressFieldDisabled = (props) => {
  const { formContext } = props
  const { control } = formContext
  // useWatch function is used to obtain value of the watched field
  const [isBillingAddressSameAsShippingAddress] = useWatch({
    control,
    name: [IS_BILLING_ADDRESS_SAME_AS_SHIPPING_ADDRESS_KEY],
  })
  return isBillingAddressSameAsShippingAddress
}

export default getIsBillingAddressFieldDisabled
