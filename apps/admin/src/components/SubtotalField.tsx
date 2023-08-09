import React from 'react'
import { sumBy } from 'lodash'
import { printAmount } from '@gravis-os/utils'
import { FormSectionFieldTypeEnum } from '@gravis-os/form'
import ObserverField, { ObserverFieldProps } from './ObserverField'
import getLineTotal from '../utils/getLineTotal'

export interface SubtotalFieldProps extends Partial<ObserverFieldProps> {}

const SubtotalField: React.FC<SubtotalFieldProps> = (props) => {
  const getValue: ObserverFieldProps['getValue'] = (observedFieldValues) => {
    const [lines, currencyRate = 1] = observedFieldValues
    return sumBy(lines, getLineTotal) * currencyRate
  }
  return (
    <ObserverField
      name="subtotal"
      label="Subtotal"
      type={FormSectionFieldTypeEnum.AMOUNT}
      observedFields={['lines', 'currency_rate']}
      getValue={getValue}
      formatValue={printAmount}
      disabled
      {...props}
    />
  )
}

export default SubtotalField
