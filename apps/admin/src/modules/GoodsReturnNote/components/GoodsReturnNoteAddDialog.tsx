import TextEditor from '@admin/components/editors/TextEditor'
import { Invoice, InvoiceLine } from '@admin/modules/Invoice/types'
import React, { useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { pick } from 'lodash'
import { useFetchInvoiceLines } from '@admin/modules/Invoice/hooks/useFetchInvoiceLines'
import DialogButton, { DialogButtonProps } from '@admin/components/DialogButton'
import { DataTable } from '@gravis-os/crud'
import { GoodsReturnNoteLine } from '@admin/modules/GoodsReturnNote/types'

interface GoodsReturnNoteLinesAddDialogProps {
  dialogButtonProps: DialogButtonProps
  onAddLines: (lines: Array<Partial<InvoiceLine>>) => void
  invoice: Invoice
}

const COLUMN_DEFS = [
  {
    colId: 'checkbox',
    maxWidth: 50,
    checkboxSelection: true,
    suppressMenu: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
  },
  { field: 'location_code', headerName: 'Location Code', maxWidth: 150 },
  { field: 'product.model_code', headerName: 'Model Code', maxWidth: 150 },
  { field: 'product.title', headerName: 'Product Name' },
  {
    field: 'invoice_qty',
    headerName: 'Invoice Qty',
  },
  {
    field: 'quantity',
    headerName: 'Goods Return Qty',
    editable: true,
    cellEditor: TextEditor,
    cellRenderer: TextEditor,
    cellStyle: { padding: 0, height: '100%' },
    valueGetter: ({ data, api }) =>
      data?.quantity > data?.invoice_qty
        ? api.setRowData([{ ...data, quantity: null }])
        : data?.quantity,
  },
]

const GoodsReturnNoteLinesAddDialog: React.FC<
  GoodsReturnNoteLinesAddDialogProps
> = (props) => {
  const { dialogButtonProps, invoice, onAddLines } = props

  const { data: invoiceLines = [] } = useFetchInvoiceLines(
    {
      match: { invoice_id: invoice.id },
    },
    {
      select: (lines) =>
        lines
          .filter((line) => line?.product_id)
          .map((line) => ({ ...line, invoice_qty: line?.quantity ?? 0 })),
    }
  )

  const linesRef = useRef<AgGridReact>(null)

  const handleAddLines = () => {
    const lines = linesRef.current?.api
      .getSelectedRows()
      .map((line) => ({
        ...pick<GoodsReturnNoteLine>(line, [
          'location_code',
          'quantity',
          'product',
          'product_id',
          'note',
        ]),
        slug: line?.product.slug,
        title: line?.product.title,
        invoice_line_id: line.id,
      }))
      .filter(({ quantity }) => Boolean(quantity))

    if (lines) onAddLines(lines)
  }

  return (
    <DialogButton
      {...dialogButtonProps}
      actionButtonProps={{
        onClick: handleAddLines,
        children: 'Add Selected',
        ...dialogButtonProps?.actionButtonProps,
      }}
    >
      <DataTable
        ref={linesRef}
        columnDefs={COLUMN_DEFS}
        rowData={invoiceLines}
        singleClickEdit
      />
    </DialogButton>
  )
}

export default GoodsReturnNoteLinesAddDialog
