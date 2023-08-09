import React, { forwardRef } from 'react'
import { DataTable } from '@gravis-os/crud'
import { AgGridReact } from 'ag-grid-react'
import { Box } from '@mui/material'
import DialogButton from '../../../components/DialogButton'
import {
  SupplierInvoice,
  SupplierInvoiceLine,
} from '../../SupplierInvoice/types'
import { getEditableColumnTypes } from '../../../utils/getEditableColumnTypes'
import TextEditor from '../../../components/editors/TextEditor'

interface DebitNotesLinesDialogProps {
  supplierInvoice: SupplierInvoice
  supplierInvoiceLines: SupplierInvoiceLine[]
  onClose: () => void
}

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
  {
    field: 'quantity',
    headerName: 'Qty To Receive',
    valueParser: 'Number(newValue)',
    filter: 'agNumberColumnFilter',
    maxWidth: 250,
    editable: true,
    cellStyle: { padding: 0, height: '100%' },
    cellRenderer: TextEditor,
    cellEditor: TextEditor,
  },
]

const DebitNotesLinesDialog = forwardRef<
  AgGridReact,
  DebitNotesLinesDialogProps
>((props, ref) => {
  const { supplierInvoice, supplierInvoiceLines, onClose } = props

  const { title } = supplierInvoice

  return (
    <DialogButton
      title={`Search for ${title} Product`}
      actionButtonProps={{ children: 'Add Selected' }}
      buttonProps={{
        color: 'inherit',
        children: 'Add Row',
      }}
      onClose={onClose}
    >
      <Box sx={{ mt: -2.5 }}>
        <DataTable
          columnTypes={getEditableColumnTypes()}
          ref={ref}
          rowData={supplierInvoiceLines}
          columnDefs={columnDefs}
          singleClickEdit
        />
      </Box>
    </DialogButton>
  )
})

export default DebitNotesLinesDialog
