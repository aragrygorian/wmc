import React from 'react'
import TotalField, { TotalFieldProps } from '../../../components/TotalField'

const SupplierInvoiceTotalField: React.FC<TotalFieldProps> = (props) => {
  const getValue: TotalFieldProps['getValue'] = (observedFieldValues) => {
    const [subtotal, tax] = observedFieldValues
    return subtotal + (tax || 0)
  }
  return (
    <TotalField
      observedFields={['subtotal', 'tax']}
      getValue={getValue}
      {...props}
    />
  )
}

export default SupplierInvoiceTotalField
