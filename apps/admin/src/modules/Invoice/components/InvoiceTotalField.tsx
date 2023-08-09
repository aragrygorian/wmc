import React from 'react'
import { sumBy } from 'lodash'
import getDiscountedValue from '@admin/utils/getDiscountedValue'
import TotalField, { TotalFieldProps } from '../../../components/TotalField'

const InvoiceTotalField: React.FC<TotalFieldProps> = (props) => {
  const getValue: TotalFieldProps['getValue'] = (observedFieldValues) => {
    const [
      subtotal,
      discountRate,
      discount,
      isDiscountRate,
      shipping,
      tax,
      creditNotes,
    ] = observedFieldValues
    const discountedSubtotal = getDiscountedValue({
      value: subtotal,
      discountRate,
      discount,
      isDiscountRate,
    })
    return (
      discountedSubtotal +
      (shipping || 0) +
      (tax || 0) -
      sumBy(creditNotes, 'total')
    )
  }
  return (
    <TotalField
      observedFields={[
        'subtotal',
        'discount_rate',
        'discount',
        'is_discount_rate',
        'shipping',
        'tax',
        'credit_note',
      ]}
      getValue={getValue}
      {...props}
    />
  )
}

export default InvoiceTotalField
