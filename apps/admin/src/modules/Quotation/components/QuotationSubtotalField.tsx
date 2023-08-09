import React from 'react'
import { sumBy } from 'lodash'
import SubtotalField, {
  SubtotalFieldProps,
} from '@admin/components/SubtotalField'
import getQuotationLineTotal from '../utils/getQuotationLineTotal'

const QuotationSubtotalField: React.FC<SubtotalFieldProps> = (props) => {
  const getValue: SubtotalFieldProps['getValue'] = (observedFieldValues) => {
    const [lines, currencyRate = 1] = observedFieldValues
    return sumBy(lines, getQuotationLineTotal) * currencyRate
  }
  return (
    <SubtotalField
      observedFields={['lines', 'currency_rate']}
      getValue={getValue}
      {...props}
    />
  )
}

export default QuotationSubtotalField
