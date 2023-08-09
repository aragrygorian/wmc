import React, { forwardRef } from 'react'
import { Box } from '@mui/material'
import { DataTable } from '@gravis-os/crud'
import { AgGridReact } from 'ag-grid-react'
import { Inventory } from '@prisma/client'
import { getEditableColumnTypes } from '../../../utils/getEditableColumnTypes'
import TextEditor from '../../../components/editors/TextEditor'
import { LoanFormLine } from '../types'
import { getReceiveBalanceForLoanFormLine } from '../utils/getReceiveBalanceForLoanFormLine'

interface LoanFormReceiveItemsDialogProps {
  inventories: Inventory[]
  lines: LoanFormLine[]
}

const LoanFormReceiveItemsDialog = forwardRef<
  AgGridReact,
  LoanFormReceiveItemsDialogProps
>((props, ref) => {
  const { inventories = [], lines = [] } = props

  const columnDefs = [
    {
      colId: 'checkbox',
      maxWidth: 50,
      checkboxSelection: true,
      suppressMenu: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
    },

    {
      maxWidth: 125,
      field: 'product.barcode',
      headerName: 'Barcode',
    },
    {
      maxWidth: 125,
      field: 'product.model_code',
      headerName: 'Model Code',
    },
    { field: 'product.title' },
    { field: 'warehouse.title' },
    {
      field: 'loaned_quantity',
      headerName: 'Loaned Qty',
      valueGetter: ({ data }) =>
        getReceiveBalanceForLoanFormLine(data, inventories),
    },
    {
      field: 'quantity',
      headerName: 'Qty To Receive',
      valueParser: 'Number(newValue)',
      valueGetter: ({ data, api }) => {
        const { quantity } = data
        const balance = getReceiveBalanceForLoanFormLine(data, inventories)

        if (balance < quantity) api.setRowData([{ ...data, quantity: null }])

        return quantity
      },
      filter: 'agNumberColumnFilter',
      maxWidth: 250,
      editable: true,
      cellStyle: { padding: 0, height: '100%' },
      cellRenderer: TextEditor,
      cellEditor: TextEditor,
    },
  ]

  return (
    <Box sx={{ mt: -2.5 }}>
      <DataTable
        columnTypes={getEditableColumnTypes()}
        ref={ref}
        rowData={lines}
        columnDefs={columnDefs}
        singleClickEdit
      />
    </Box>
  )
})

export default LoanFormReceiveItemsDialog
