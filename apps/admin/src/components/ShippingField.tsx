import React from 'react'
import { FormSectionFieldTypeEnum } from '@gravis-os/form'
import { printAmount } from '@gravis-os/utils'
import EditOrReadOnlyField, {
  EditOrReadOnlyFieldProps,
} from './EditOrReadOnlyField'

export interface ShippingFieldProps extends Partial<EditOrReadOnlyFieldProps> {}

const ShippingField: React.FC<ShippingFieldProps> = (props) => {
  return (
    <EditOrReadOnlyField
      name="shipping"
      label="Shipping"
      type={FormSectionFieldTypeEnum.AMOUNT}
      formatValue={printAmount}
      {...props}
    />
  )
}

export default ShippingField
