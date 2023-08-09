import React, { forwardRef } from 'react'
import { StepWizardChildProps } from 'react-step-wizard'
import { DataTable } from '@gravis-os/crud'
import { printAmount } from '@gravis-os/utils'
import { AgGridReact } from 'ag-grid-react'
import TextEditor from '../../../../components/editors/TextEditor'
import { SalesOrderLine } from '../../types'

const columnDefs = [
  { field: 'product.model_code', headerName: 'Model Code' },
  { field: 'product.title', headerName: 'Product Name' },
  {
    field: 'unit_price',
    headerName: 'Unit Price',
    valueFormatter: ({ value }) => printAmount(value),
  },
  { field: 'quantity', headerName: 'Total Qty' },
  {
    field: 'claim_quantity',
    headerName: 'Claim Qty',
    editable: true,
    valueParser: 'Number(newValue)',
    cellRenderer: TextEditor,
    cellEditor: TextEditor,
    cellStyle: { margin: 0, height: '100%' },
  },
]

interface ProgressiveClaimWizardSelectItemsStepProps
  extends Partial<StepWizardChildProps> {
  items: SalesOrderLine[]
}

const ProgressiveClaimWizardSelectItemsStep = forwardRef<
  AgGridReact,
  ProgressiveClaimWizardSelectItemsStepProps
>((props, ref) => {
  const { items } = props

  return (
    <DataTable
      ref={ref}
      rowData={items}
      columnDefs={columnDefs}
      stopEditingWhenCellsLoseFocus
      singleClickEdit
    />
  )
})

export default ProgressiveClaimWizardSelectItemsStep
