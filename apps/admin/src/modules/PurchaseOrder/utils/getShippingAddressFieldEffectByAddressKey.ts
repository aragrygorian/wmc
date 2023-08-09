const getShippingAddressFieldEffectByAddressKey = ({
  addressKey,
}: {
  addressKey: string
}) => {
  const shippingAddressFieldKey = `address_${addressKey}`
  return {
    watch: ['warehouse_id'],
    setValue: (props) => {
      const { values } = props
      const companyOrContactItem = values.warehouse_id || {}
      return companyOrContactItem[shippingAddressFieldKey] || ''
    },
  }
}

export default getShippingAddressFieldEffectByAddressKey
