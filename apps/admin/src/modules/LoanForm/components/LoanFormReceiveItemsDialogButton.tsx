import React, { FC, useRef } from 'react'
import { Box } from '@mui/material'
import { AgGridReact } from 'ag-grid-react'
import { useCreateMutation } from '@gravis-os/crud'
import { useUser } from '@gravis-os/auth'
import toast from 'react-hot-toast'
import { useFormContext } from 'react-hook-form'
import { Inventory } from '@prisma/client'
import { useQueryClient } from 'react-query'
import LoanFormReceiveItemsDialog from './LoanFormReceiveItemsDialog'
import { LoanFormLine } from '../types'
import DialogButton from '../../../components/DialogButton'
import inventoryModule from '../../Inventory/inventoryModule'
import { useFetchInventories } from '../../Inventory/hooks/useFetchInventories'
import { getReceiveBalanceForLoanFormLine } from '../utils/getReceiveBalanceForLoanFormLine'

const LoanFormReceiveItemsDialogButton = (props) => {
  const { formContext } = props
  const { watch } = formContext

  const queryClient = useQueryClient()
  const { user } = useUser()

  const lines = watch('lines') as LoanFormLine[]

  const match =
    lines
      ?.filter(({ id }) => typeof id === 'number')
      .map(({ id }) => ({
        loan_form_line_id: id,
      })) || []

  const { data: inventories = [], refetch: refetchInventories } =
    useFetchInventories(
      {
        match,
        select:
          '*, loan_form_line:loan_form_line_id(*, product:product_id(*), warehouse:warehouse_id(*))',
      },
      { enabled: Boolean(match.length) }
    )

  const { createMutation: createInventoryMutation } =
    useCreateMutation<Inventory>({
      module: inventoryModule,
      options: {
        onSuccess: () =>
          queryClient.invalidateQueries([inventoryModule.table.name]),
      },
    })

  const ref = useRef<AgGridReact>(null)

  const handleSubmit = async () => {
    const items = ref.current?.api.getSelectedRows() as LoanFormLine[]

    if (items.some(({ quantity }) => !quantity))
      toast.error('All items to receive must have a valid quantity')

    await Promise.all(
      items
        .filter(({ product, warehouse }) => product && warehouse)
        .map(({ id, quantity, product, warehouse }) =>
          createInventoryMutation.mutateAsync({
            warehouse_id: warehouse?.id,
            product_id: product?.id,
            loan_form_line_id: id,
            in: quantity,
            created_by: user?.id,
            updated_by: user?.id,
          })
        )
    )

    await refetchInventories()
  }

  return (
    <DialogButton
      title="Receive Items"
      actionButtonProps={{ children: 'Add Selected' }}
      buttonProps={{
        color: 'inherit',
        disabled: lines?.every(
          (line) => getReceiveBalanceForLoanFormLine(line, inventories) <= 0
        ),
      }}
      onClose={handleSubmit}
    >
      <Box sx={{ mt: -2.5 }}>
        <LoanFormReceiveItemsDialog
          ref={ref}
          lines={lines}
          inventories={inventories}
        />
      </Box>
    </DialogButton>
  )
}

export default LoanFormReceiveItemsDialogButton
