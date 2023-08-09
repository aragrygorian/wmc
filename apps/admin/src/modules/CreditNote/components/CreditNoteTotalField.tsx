import React from 'react'
import SubtotalField, {
  SubtotalFieldProps,
} from '@admin/components/SubtotalField'

const CreditNoteTotalField: React.FC<SubtotalFieldProps> = (props) => {
  return <SubtotalField name="total" label="Total" {...props} />
}

export default CreditNoteTotalField
