const ADDRESS_KEYS = [
  'shipping_address_city',
  'hipping_address_country',
  'shipping_address_line_1',
  'shipping_address_line_2',
  'shipping_address_postal_code',
]

const getShippingAddressFieldEffectByAddressKey = ({
  addressKey,
}: {
  addressKey: string
}) => {
  const shippingAddressFieldKey = `shipping_address_${addressKey}`
  return {
    watch: ['company_id', 'contact_id'],
    setValue: (props) => {
      const { formState, item, values } = props
      const { isDirty } = formState

      // Always source from company first
      const companyOrContactItem = values.company_id || values.contact_id || {}
      const itemHasAddress = ADDRESS_KEYS.some((key) => Boolean(item?.[key]))

      if (!isDirty && itemHasAddress) return item?.[shippingAddressFieldKey]

      return companyOrContactItem[shippingAddressFieldKey] || ''
    },
  }
}

export default getShippingAddressFieldEffectByAddressKey
