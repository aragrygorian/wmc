import React from 'react'
import { FormSectionFieldTypeEnum } from '@gravis-os/form'
import { printAmount } from '@gravis-os/utils'
import EditOrReadOnlyField, {
  EditOrReadOnlyFieldProps,
} from '../../../components/EditOrReadOnlyField'

const InvoiceShippingField: React.FC<Partial<EditOrReadOnlyFieldProps>> = (
  props
) => {
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

export default InvoiceShippingField
