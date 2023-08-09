import React, { forwardRef, useMemo } from 'react'
import { StepWizardChildProps } from 'react-step-wizard'
import { DataTable } from '@gravis-os/crud'
import { SalesOrderLine } from '@prisma/client'
import { AgGridReact } from 'ag-grid-react'
import { ColDef } from 'ag-grid-community'
import { lte } from 'lodash'
import TextEditor from '../../../../components/editors/TextEditor'

interface OrderFormWizardSelectItemsStepProps
  extends Partial<StepWizardChildProps> {
  items: SalesOrderLine[]
}

const OrderFormWizardSelectItemsStep = forwardRef<
  AgGridReact,
  OrderFormWizardSelectItemsStepProps
>((props, ref) => {
  const { items } = props

  const initialQuantities = useMemo(
    () => items.map(({ quantity }) => quantity),
    []
  )

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        field: 'product.model_code',
        headerName: 'Model Code',
        valueFormatter: ({ value }) => value && `#${value}`,
      },
      { field: 'product.title', headerName: 'Product Name', minWidth: 500 },
      { field: 'product.brand.company.title', headerName: 'Supplier' },
      { field: 'product.brand.title', headerName: 'Brand' },
      { field: 'note' },
      {
        field: 'quantity',
        headerName: 'Qty',
        editable: true,
        valueParser: ({ newValue }) => Number.parseInt(newValue, 10),
        cellRenderer: TextEditor,
        cellEditor: TextEditor,
        cellRendererParams: ({ rowIndex, value }) => ({
          withToastValidationProps: {
            helperText:
              'Please ensure OF quantity does not exceed SO quantity.',
            validatorFns: [() => lte(value, initialQuantities[rowIndex])],
          },
        }),
        cellStyle: { padding: 0, height: '100%' },
      },
      { field: 'actions', hide: true },
    ],
    [items]
  )

  return (
    <DataTable
      ref={ref}
      rowData={items}
      columnDefs={columnDefs}
      context={{ name: 'quantity' }}
      stopEditingWhenCellsLoseFocus
      singleClickEdit
    />
  )
})

export default OrderFormWizardSelectItemsStep
