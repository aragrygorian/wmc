import React from 'react'
import { QuotationLine } from '@admin/modules/Quotation/types'
import { useMutation, useQueryClient } from 'react-query'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { quotationLineModule } from '@admin/modules/Quotation/quotationLineModule'
import { quotationModule } from '@admin/modules/Quotation/quotationModule'
import { get, pick } from 'lodash'
import DialogButton from '@admin/components/DialogButton'
import { useForm } from 'react-hook-form'
import QuotationLineRejectForm, {
  ACTION_CHANGED,
  ACTION_REJECTED,
  QuotationLineRejectFormFields,
} from './QuotationLineRejectForm'

interface QuotationLineRejectButtonProps {
  line: QuotationLine
}

const QuotationLineRejectButton: React.FC<QuotationLineRejectButtonProps> = (
  props
) => {
  const { line } = props

  const queryClient = useQueryClient()

  const useUpdateQuotationLine = useMutation(
    async ({ id, ...values }: Partial<QuotationLine>) =>
      supabaseClient
        .from(quotationLineModule.table.name)
        .update(values)
        .match({ id }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([quotationModule.table.name]),
    }
  )

  const defaultValues: QuotationLineRejectFormFields = {
    action: ACTION_REJECTED,
    note: '',
    requested_discount_rate: get(line, 'requested_discount_rate') || 0,
  }

  const form = useForm({ defaultValues })
  const { handleSubmit } = form

  const submitRejected = async (
    formValues: Omit<QuotationLineRejectFormFields, 'action'>
  ) =>
    useUpdateQuotationLine.mutateAsync({
      ...pick(line, ['id']),
      ...pick(formValues, ['note']),
      requested_discount_rate: null,
      status: null,
    })

  const submitChanged = async (
    formValues: Omit<QuotationLineRejectFormFields, 'action'>
  ) =>
    useUpdateQuotationLine.mutateAsync({
      ...pick(line, ['id']),
      ...pick(formValues, ['note']),
      discount_rate: formValues.requested_discount_rate,
      requested_discount_rate: null,
      status: null,
    })

  const submit = async (formValues: QuotationLineRejectFormFields) => {
    const { action, ...rest } = formValues

    if (action === ACTION_CHANGED) await submitChanged(rest)
    else await submitRejected(rest)
  }

  return (
    <DialogButton
      title="Discount Approval Preview"
      buttonProps={{
        children: 'Reject',
        color: 'inherit',
        size: 'small',
        variant: 'outlined',
        sx: { color: 'text.disabled', minWidth: 60 },
      }}
      actionButtonProps={{
        children: 'Submit',
        onClick: handleSubmit(submit),
      }}
    >
      <QuotationLineRejectForm line={line} form={form} />
    </DialogButton>
  )
}

export default QuotationLineRejectButton
