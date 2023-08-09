import React, { FC } from 'react'
import { Box } from '@mui/material'
import { DataTable } from '@gravis-os/crud'
import { useRouter } from 'next/router'
import { first } from 'lodash'
import dayjs from 'dayjs'
import { useFetchLoanForms } from '../hooks/useFetchLoanForms'
import { loanFormModule } from '../loanFormConfig'
import { useFetchInventories } from '../../Inventory/hooks/useFetchInventories'
import UserCell from '../../../components/UserCell'

const columnDefs = [
  {
    maxWidth: 125,
    field: 'loan_form_line.product.barcode',
    headerName: 'Barcode',
  },
  {
    maxWidth: 125,
    field: 'loan_form_line.product.model_code',
    headerName: 'Model Code',
  },
  { field: 'loan_form_line.product.title', headerName: 'Product Name' },
  { field: 'loan_form_line.warehouse.title', headerName: 'Warehouse' },
  {
    field: 'in',
    headerName: 'Qty',
    minWidth: 100,
  },
  {
    field: 'created_by',
    headerName: 'Created By',
    cellRenderer: ({ data }) => <UserCell id={data?.created_by} />,
  },
  {
    field: 'created_at',
    headerName: 'Date Returned',
    valueFormatter: ({ data }) => dayjs(data?.created_at).format('DD MMM YYYY'),
  },
]

const LoanFormReturnedItemsDialog: FC = () => {
  const router = useRouter()

  const { query } = router
  const { slug } = query

  const { data } = useFetchLoanForms({
    match: { slug },
    select: loanFormModule.select.detail,
  })

  const match =
    first(data)?.lines?.map(({ id }) => ({
      loan_form_line_id: id,
    })) || []

  const { data: inventories } = useFetchInventories(
    {
      match,
      select:
        '*, loan_form_line:loan_form_line_id(*, product:product_id(*), warehouse:warehouse_id(*))',
    },
    {
      enabled: Boolean(match.length),
      select: (inventories) => inventories.filter((inventory) => inventory.in),
    }
  )

  return (
    <Box sx={{ mt: -2.5 }}>
      <DataTable rowData={inventories} columnDefs={columnDefs} />
    </Box>
  )
}

export default LoanFormReturnedItemsDialog
