import React from 'react'
import { QuotationLine } from '@admin/modules/Quotation/types'
import { Button } from '@gravis-os/ui'
import { useMutation, useQueryClient } from 'react-query'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { pick } from 'lodash'
import { quotationModule } from '@admin/modules/Quotation/quotationModule'
import { quotationLineModule } from '@admin/modules/Quotation/quotationLineModule'

interface QuotationLineApproveButtonProps {
  line: QuotationLine
}

const QuotationLineApproveButton: React.FC<QuotationLineApproveButtonProps> = (
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

  const handleClick = async () => {
    await useUpdateQuotationLine.mutateAsync({
      ...pick(line, ['id']),
      discount_rate: line.requested_discount_rate,
      requested_discount_rate: null,
      status: null,
    })
  }

  return (
    <Button
      onClick={handleClick}
      size="small"
      variant="contained"
      sx={{
        backgroundColor: 'status.green.main',
        color: 'primary.contrastText',
        '&:hover': {
          backgroundColor: 'status.green.main',
        },
        minWidth: 60,
      }}
    >
      Accept
    </Button>
  )
}

export default QuotationLineApproveButton
