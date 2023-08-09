import React from 'react'
import { printAmount, printPercentage } from '@gravis-os/utils'
import { FormSectionFieldTypeEnum } from '@gravis-os/form'
import { appConfig } from '@admin/app/config'
import getDiscountedValue from '@admin/utils/getDiscountedValue'
import ObserverField, { ObserverFieldProps } from './ObserverField'

export interface TaxFieldProps extends Partial<ObserverFieldProps> {}

const TaxField: React.FC<TaxFieldProps> = (props) => {
  const getValue: ObserverFieldProps['getValue'] = (observedFieldValues) => {
    const [subtotal, discountRate, discount, isDiscountRate, shipping] =
      observedFieldValues
    const discountedSubtotal = getDiscountedValue({
      value: subtotal,
      discountRate,
      discount,
      isDiscountRate,
    })
    return (discountedSubtotal + (shipping || 0)) * appConfig.taxRate
  }
  return (
    <ObserverField
      name="tax"
      label={`GST (${printPercentage(appConfig.taxRate)})`}
      type={FormSectionFieldTypeEnum.AMOUNT}
      observedFields={[
        'subtotal',
        'discount_rate',
        'discount',
        'is_discount_rate',
        'shipping',
      ]}
      getValue={getValue}
      formatValue={printAmount}
      disabled
      {...props}
    />
  )
}

export default TaxField
