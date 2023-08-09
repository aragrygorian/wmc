import React, { useMemo, useRef, useState } from 'react'
import { Controller, useFieldArray, useWatch } from 'react-hook-form'
import { first, groupBy, omit, sumBy, toNumber } from 'lodash'
import { printAmount, printPercentage } from '@gravis-os/utils'
import { Button, Card, MoreIconButton, Stack } from '@gravis-os/ui'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { DataTable, DataTableProps } from '@gravis-os/crud'
import { Box } from '@mui/material'
import { AgGridReact } from 'ag-grid-react'
import getTotalFromDebitNoteLine from '@admin/modules/DebitNote/utils/getTotalFromDebitNoteLine'
import { getEditableColumnTypes } from '../../../utils/getEditableColumnTypes'
import { useFetchSupplierInvoiceLines } from '../../SupplierInvoice/hooks/useFetchSupplierInvoiceLines'
import DebitNotesLinesDialog from './DebitNoteLinesDialog'
import { SupplierInvoiceLine } from '../../SupplierInvoice/types'
import { parsePercentage } from '../../Quotation/utils/parsePercentage'

const DebitNoteLinesFieldArray = (props) => {
  const { formContext, isReadOnly } = props

  const { control, setValue } = formContext

  const gridRef = useRef<AgGridReact>(null)

  const [sortable, setSortable] = useState(true)

  const name = 'lines'
  const rows = useWatch({ name, control }) || []

  const fieldArray = useFieldArray({ control, name })
  const { fields, replace } = fieldArray

  const supplierInvoice = useWatch({ control, name: 'supplier_invoice_id' })

  const { data: supplierInvoiceLines } = useFetchSupplierInvoiceLines(
    {
      select: '*, product:product_id(*,brand:brand_id(*))',
      match: {
        supplier_invoice_id: supplierInvoice?.id,
      },
    },
    { enabled: Boolean(supplierInvoice?.id) }
  )

  const handleDialogClose = () =>
    handleAddRows(
      gridRef.current?.api.getSelectedRows() as SupplierInvoiceLine[]
    )

  const handleAddRows = (lines) => {
    const lastRow = rows[rows.length - 1]
    const nextLines = Object.values(
      groupBy([...rows, ...lines], 'product_id')
    ).map((lines) => {
      const nextLine = first(lines)

      return {
        ...omit(nextLine, ['purchase_order_line_id', 'supplier_invoice_id']),
        quantity: sumBy(lines, (line) => toNumber(line.quantity)),
        position: (lastRow?.position ?? -1) + 1,
      }
    })

    replace(nextLines)
  }

  const handleDeleteRow = (rowIndex: number) => {
    setValue(
      name,
      rows
        .filter((_, index) => index !== rowIndex)
        .map((row, index) => ({ ...row, position: index }))
    )
  }

  const handleDuplicateRow = (row, index) => {
    setValue(
      name,
      rows
        .slice(0, index + 1)
        .concat(omit(row, 'id'))
        .concat(rows.slice(index + 1))
        .map((row, index) => ({ ...row, position: index }))
    )
  }

  const columnDefs = useMemo(() => {
    return [
      {
        colId: 'drag',
        rowDrag: sortable,
        maxWidth: 30,
        suppressMenu: true,
      },
      {
        colId: 'checkbox',
        maxWidth: 50,
        checkboxSelection: true,
        suppressMenu: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
      },
      {
        maxWidth: 50,
        field: 'position',
        headerName: '#',
        cellRenderer: ({ data, node }) => (data.position ?? node.rowIndex) + 1,
        suppressMenu: true,
      },
      {
        field: 'product.model_code',
        headerName: 'Model Code',
        minWidth: 125,
      },
      {
        minWidth: 325,
        field: 'product_id',
        headerName: 'Product Name',
        valueGetter: ({ data }) => data?.product?.title,
      },
      {
        field: 'quantity',
        headerName: 'Qty to deliver',
        minWidth: 100,
        type: 'editableNumberColumn',
        cellRendererParams: { name: 'quantity' },
        cellEditorParams: { name: 'quantity' },
      },
      {
        field: 'unit_price',
        headerName: 'Net Unit Price',
        minWidth: 100,
        valueFormatter: ({ value }) => printAmount(value),
      },
      {
        type: 'editableNumberColumn',
        field: 'discount_rate',
        headerName: 'Discount Rate',
        minWidth: 125,
        valueFormatter: ({ value }) => printPercentage(value, { dp: 2 }),
        valueParser: ({ newValue }) => parsePercentage(newValue),
        cellRendererParams: { name: 'discount_rate' },
        cellEditorParams: { name: 'discount_rate' },
      },
      {
        field: 'subtotal',
        minWidth: 100,
        valueGetter: ({ data }) => getTotalFromDebitNoteLine(data),
        valueFormatter: ({ value }) => printAmount(value),
      },
      {
        field: 'note',
        type: 'editableTextColumn',
        minWidth: 100,
        maxWidth: 100,
        cellRendererParams: { name: 'note' },
        cellEditorParams: { name: 'note' },
      },
      {
        colId: 'actions',
        maxWidth: 80,
        suppressMenu: true,
        field: 'actions',
        cellRenderer: ({ data, rowIndex }) => (
          <MoreIconButton
            size="small"
            items={[
              {
                key: 'duplicate',
                value: 'duplicate',
                label: 'Duplicate',
                icon: <ContentCopyOutlinedIcon fontSize="small" />,
                onClick: () => handleDuplicateRow(data, rowIndex),
              },
              {
                key: 'delete',
                value: 'delete',
                label: 'Delete',
                icon: <DeleteOutlineOutlinedIcon fontSize="medium" />,
                onClick: () => handleDeleteRow(rowIndex),
              },
            ]}
          />
        ),
      },
    ].filter(
      ({ colId }) =>
        !isReadOnly ||
        !colId ||
        !['actions', 'drag', 'checkbox'].includes(colId)
    )
  }, [rows, sortable, isReadOnly])

  const dataTableProps: DataTableProps = {
    actions: (
      <>
        <Button size="small" variant="outlined">
          Search Products
        </Button>
      </>
    ),
    columnDefs,
    columnTypes: getEditableColumnTypes(),
    height: 375,
    rowData: rows,
    rowGroupPanelShow: 'onlyWhenGrouping',
    groupDisplayType: 'groupRows',
    rowDragManaged: false,
    onRowDragEnd: (event) => {
      const { overIndex, node } = event
      const { childIndex } = node
      if (overIndex === childIndex) return
      const linesWithUpdatedPositions = rows
        .reduce((nextLines, line, index) => {
          if (index === childIndex) return nextLines
          const draggedLine = rows[childIndex]
          const linesToReinsert =
            index === overIndex
              ? childIndex < overIndex
                ? [line, draggedLine]
                : [draggedLine, line]
              : line
          return nextLines.concat(linesToReinsert)
        }, [])
        .map((line, index) => ({ ...line, position: index }))
      setValue(name, linesWithUpdatedPositions)
    },
    onFilterChanged: (event) => setSortable(!event.api.isAnyFilterPresent()),
    onSortChanged: (event) =>
      setSortable(!event.columnApi.getColumnState().some(({ sort }) => sort)),
    suppressClickEdit: isReadOnly,
    singleClickEdit: true,
    context: { name },
  }

  return (
    <Card>
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="flex-end"
        spacing={1}
        sx={{ mb: 1 }}
      />
      <DataTable {...dataTableProps} />
      {fields.map(({ id }, index) => (
        <Controller
          key={`${name}-${id}`}
          name={`${name}.${index}.id`}
          control={control}
          defaultValue={id}
          render={({ field }) => <Box hidden component="input" {...field} />}
        />
      ))}
      {!isReadOnly && supplierInvoiceLines && (
        <DebitNotesLinesDialog
          supplierInvoiceLines={supplierInvoiceLines}
          supplierInvoice={supplierInvoice}
          ref={gridRef}
          onClose={handleDialogClose}
        />
      )}
    </Card>
  )
}

export default DebitNoteLinesFieldArray
