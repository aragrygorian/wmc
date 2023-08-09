import React, { useRef } from 'react'
import { DataTable } from '@gravis-os/crud'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { AgGridReact } from 'ag-grid-react'
import { printAmount } from '@gravis-os/utils'
import { pick } from 'lodash'
import TextEditor from '../../../components/editors/TextEditor'
import DialogButton from '../../../components/DialogButton'
import { InvoiceLine } from '../types'
import { SalesOrder } from '../../SalesOrder/types'
import { useFetchSalesOrderLines } from '../../SalesOrder/hooks/useFetchSalesOrderLines'

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

interface InvoiceLinesAddDialogProps {
  onAddLines: (lines: Array<Partial<InvoiceLine>>) => void
  salesOrder: SalesOrder
}

const InvoiceLinesAddDialog: React.FC<InvoiceLinesAddDialogProps> = (props) => {
  const { salesOrder, onAddLines } = props

  const linesRef = useRef<AgGridReact>(null)

  const handleAddlines = () => {
    const lines = linesRef.current?.api
      .getSelectedRows()
      .map((line) => ({
        ...pick<InvoiceLine>(line, [
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

  const { data: salesOrderLines } = useFetchSalesOrderLines({
    match: { sales_order_id: salesOrder.id },
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
        rowData={salesOrderLines}
        singleClickEdit
      />
    </DialogButton>
  )
}

export default InvoiceLinesAddDialog
