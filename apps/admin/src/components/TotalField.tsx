import React from 'react'
import { printAmount } from '@gravis-os/utils'
import { FormSectionFieldTypeEnum } from '@gravis-os/form'
import getDiscountedValue from '@admin/utils/getDiscountedValue'
import ObserverField, { ObserverFieldProps } from './ObserverField'

export interface TotalFieldProps extends Partial<ObserverFieldProps> {}

const TotalField: React.FC<TotalFieldProps> = (props) => {
  const getValue: ObserverFieldProps['getValue'] = (observedFieldValues) => {
    const [subtotal, discountRate, discount, isDiscountRate, shipping, tax] =
      observedFieldValues
    const discountedSubtotal = getDiscountedValue({
      value: subtotal,
      discountRate,
      discount,
      isDiscountRate,
    })
    return discountedSubtotal + (shipping || 0) + (tax || 0)
  }
  return (
    <ObserverField
      name="total"
      label="Total"
      type={FormSectionFieldTypeEnum.AMOUNT}
      observedFields={[
        'subtotal',
        'discount_rate',
        'discount',
        'is_discount_rate',
        'shipping',
        'tax',
      ]}
      getValue={getValue}
      formatValue={printAmount}
      disabled
      {...props}
    />
  )
}

export default TotalField
