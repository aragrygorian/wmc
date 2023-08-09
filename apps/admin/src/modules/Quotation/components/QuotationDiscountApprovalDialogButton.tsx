import React, { useEffect, useState } from 'react'
import DialogButton from '@admin/components/DialogButton'
import { Stack, Typography } from '@gravis-os/ui'
import { Quotation, QuotationLine } from '@admin/modules/Quotation/types'
import { ModelField } from '@gravis-os/form'
import { userModule } from '@admin/modules/User/userConfig'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { SALES_MANAGER_ROLE } from '@admin/modules/Role/constants'
import { User } from '@admin/modules/User/types'
import { has, noop, pick } from 'lodash'
import { useMutation, useQueryClient } from 'react-query'
import { CrudModule } from '@gravis-os/types'
import {
  QUOTATION_LINE_STATUS_PENDING_APPROVAL,
  QUOTATION_STATUS_PENDING_APPROVAL,
} from '@admin/modules/Quotation/constants'
import { quotationLineModule } from '@admin/modules/Quotation/quotationLineModule'
import { quotationModule } from '../quotationModule'

interface QuotationDiscountApprovalDialogButtonProps {
  quotation: Quotation
}

const useUpdateMutation = <T extends { id: number }>(module: CrudModule) => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({ id, ...values }: Partial<T>) =>
      supabaseClient.from(module.table.name).update(values).match({ id }),
    {
      onSuccess: () => queryClient.invalidateQueries([module.table.name]),
    }
  )
}
const QuotationDiscountApprovalDialogButton: React.FC<
  QuotationDiscountApprovalDialogButtonProps
> = (props) => {
  const { quotation } = props
  const { assignee: injectedAssignee, id } = quotation

  const [assignee, setAssignee] = useState<User>(null)

  const updateQuotation = useUpdateMutation<Quotation>(quotationModule)
  const updateQuotationLine =
    useUpdateMutation<QuotationLine>(quotationLineModule)

  const getSalesManagers = async ({ select }) =>
    supabaseClient
      .from(userModule.table.name)
      .select(select)
      .match({ 'role.type': SALES_MANAGER_ROLE })

  const handleSubmit = async () => {
    if (!assignee) return

    const quotationLinesToUpdate = quotation.lines.filter((line) =>
      has(line, 'requested_discount_rate')
    )

    await Promise.all(
      quotationLinesToUpdate.map((line) =>
        updateQuotationLine.mutateAsync({
          ...pick(line, ['id', 'requested_discount_rate']),
          status: QUOTATION_LINE_STATUS_PENDING_APPROVAL,
        })
      )
    )

    await updateQuotation.mutateAsync({
      id,
      assignee_id: assignee.id,
      status: QUOTATION_STATUS_PENDING_APPROVAL,
    })
  }

  useEffect(() => {
    if (injectedAssignee?.role.type !== SALES_MANAGER_ROLE) return
    setAssignee(injectedAssignee)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DialogButton
      title="Submit for Approval"
      buttonProps={{ disabled: !quotation.lines?.length }}
      actionButtonProps={{
        children: 'Request',
        onClick: handleSubmit,
      }}
    >
      <Stack gap={2}>
        <Typography>
          You are submitting this quotation for discount approval. Please choose
          the approver below:
        </Typography>
        <Typography variant="h4">Quotation: {quotation.title}</Typography>
        <ModelField
          module={userModule}
          name="user_ids"
          setValue={noop}
          onChange={setAssignee}
          value={assignee?.email}
          label="Approver"
          optionLabelKey="full_name"
          select="id, title, full_name, role!inner(*)"
          renderOption={({ option }) => <>{option.full_name ?? option.title}</>}
          setQuery={getSalesManagers}
        />
      </Stack>
    </DialogButton>
  )
}

export default QuotationDiscountApprovalDialogButton
