const getBillingAddressFieldEffectByAddressKey = ({
  addressKey,
}: {
  addressKey: string
}) => {
  const billingAddressFieldKey = `billing_address_${addressKey}`
  return {
    watch: ['company_id'],
    setValue: (props) => {
      const { values } = props
      const companyItem = values.company_id || {}
      return companyItem[billingAddressFieldKey] || ''
    },
  }
}

export default getBillingAddressFieldEffectByAddressKey
