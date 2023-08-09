import React, { useRef } from 'react'
import { DataTable } from '@gravis-os/crud'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { AgGridReact } from 'ag-grid-react'
import { printAmount } from '@gravis-os/utils'
import { pick } from 'lodash'
import { useFetchInvoiceLines } from '@admin/modules/Invoice/hooks/useFetchInvoiceLines'
import { Invoice, InvoiceLine } from '@admin/modules/Invoice/types'
import TextEditor from '../../../components/editors/TextEditor'
import DialogButton from '../../../components/DialogButton'
import { CreditNoteLine } from '../types'

const columnDefs = [
  {
    colId: 'checkbox',
    maxWidth: 50,
    checkboxSelection: true,
    suppressMenu: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
  },
  { field: 'product.model_code', headerName: 'Model Code', maxWidth: 150 },
  { field: 'product.title', headerName: 'Product Name' },
  {
    field: 'note',
    editable: true,
    cellEditor: TextEditor,
    cellRenderer: TextEditor,
    cellStyle: { padding: 0, height: '100%' },
  },
  {
    field: 'quantity',
    headerName: 'Qty',
    editable: true,
    cellEditor: TextEditor,
    cellRenderer: TextEditor,
    cellStyle: { padding: 0, height: '100%' },
  },
  {
    field: 'unit_price',
    headerName: 'Unit Price ($)',
    valueFormatter: ({ value }) => printAmount(value),
  },
  { field: 'discount_rate', headerName: 'Discount Rate' },
  {
    field: 'total',
    valueGetter: ({ getValue }) =>
      getValue('unit_price') *
      getValue('quantity') *
      (1 - (getValue('discount_rate') || 0)),
    valueFormatter: ({ value }) => printAmount(value),
  },
]

interface CreditNoteLinesAddDialogProps {
  onAddLines: (lines: Array<Partial<CreditNoteLine>>) => void
  invoice: Invoice
}

const CreditNoteLinesAddDialog: React.FC<CreditNoteLinesAddDialogProps> = (
  props
) => {
  const { invoice, onAddLines } = props

  const linesRef = useRef<AgGridReact>(null)

  const handleAddlines = () => {
    const lines = linesRef.current?.api
      .getSelectedRows()
      .map((line) => ({
        ...pick<CreditNoteLine>(line, [
          'quantity',
          'unit_price',
          'product',
          'product_id',
          'discount_rate',
          'note',
          'location_code',
        ]),
        invoice_line_id: line.id,
      }))
      .filter(({ quantity }) => Boolean(quantity))
    if (lines) onAddLines(lines)
  }

  const { data: invoiceLines } = useFetchInvoiceLines({
    match: { invoice_id: invoice.id },
  })

  return (
    <DialogButton
      title="Add Row"
      buttonProps={{ startIcon: <AddOutlinedIcon /> }}
      actionButtonProps={{ onClick: handleAddlines, children: 'Add Selected' }}
    >
      <DataTable
        ref={linesRef}
        columnDefs={columnDefs}
        rowData={invoiceLines}
        singleClickEdit
      />
    </DialogButton>
  )
}

export default CreditNoteLinesAddDialog
