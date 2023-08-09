import React from 'react'
import { sumBy } from 'lodash'
import { printAmount } from '@gravis-os/utils'
import { CreditNote } from '@prisma/client'
import { FormSectionFieldTypeEnum } from '@gravis-os/form'
import { Invoice } from '../types'
import EditOrReadOnlyField, {
  EditOrReadOnlyFieldProps,
} from '../../../components/EditOrReadOnlyField'

interface InvoiceCreditNoteFieldProps
  extends Partial<EditOrReadOnlyFieldProps> {
  item?: Invoice
}

const InvoiceCreditNoteField: React.FC<InvoiceCreditNoteFieldProps> = (
  props
) => {
  const { item, control, ...rest } = props
  const { credit_note: creditNotes } =
    (item as Invoice & { credit_note: CreditNote[] }) || {}
  const value = sumBy(creditNotes, 'total')

  return (
    <EditOrReadOnlyField
      name="credit_note"
      label="Credit Note"
      type={FormSectionFieldTypeEnum.AMOUNT}
      formatValue={printAmount}
      value={value}
      disabled
      {...rest}
    />
  )
}

export default InvoiceCreditNoteField
