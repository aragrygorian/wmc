import React, { useMemo, useState } from 'react'
import { printAmount, printPercentage } from '@gravis-os/utils'
import { DataTable, DataTableProps } from '@gravis-os/crud'
import { Button, Card, MoreIconButton, Stack } from '@gravis-os/ui'
import { Controller, useFieldArray, useWatch } from 'react-hook-form'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { omit } from 'lodash'
import { Box } from '@mui/material'
import ControlledTextEditor from '../../../components/editors/ControlledTextEditor'
import SupplierInvoiceLinesAddDialog from './SupplierInvoiceLinesAddDialog'
import { getEditableColumnTypes } from '../../../utils/getEditableColumnTypes'

// TODO: Add types
const SupplierInvoiceLinesFieldArray = (props) => {
  const { formContext, isReadOnly } = props
  const { control, setValue } = formContext

  const [sortable, setSortable] = useState(true)

  const name = 'lines'
  const rows = useWatch({ name, control }) || []
  const fieldArray = useFieldArray({ control, name })
  const { append, fields } = fieldArray

  const supplier = useWatch({ name: 'company_id' })

  const handleAddRows = (lines) => {
    const nextRows = lines.map((line, index) => ({
      ...line,
      position: fields.length + index,
    }))
    return append(nextRows)
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

  // Formulas
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
      { field: 'product.barcode', headerName: 'Barcode', maxWidth: 150 },
      { field: 'product.model_code', headerName: 'Model Code', maxWidth: 150 },
      { field: 'product.title', headerName: 'Product Name', minWidth: 250 },
      {
        field: 'purchase_order_line.order_form_line.order_form.title',
        headerName: 'OF Ref',
        maxWidth: 150,
      },
      {
        field: 'purchase_order_line.purchase_order.title',
        headerName: 'PO Ref',
        maxWidth: 150,
      },
      {
        field:
          'purchase_order_line.order_form_line.order_form.sales_order.title',
        headerName: 'SO Ref',
        maxWidth: 150,
      },
      {
        type: 'editableNumberColumn',
        field: 'quantity',
        headerName: 'Order Qty',
        maxWidth: 100,
        cellRendererParams: { name: 'quantity' },
        cellEditorParams: { name: 'quantity' },
      },
      {
        field: 'unit_price',
        headerName: 'Unit Price',
        minWidth: 100,
        valueFormatter: ({ value }) => printAmount(value),
        cellRenderer: ControlledTextEditor,
        cellRendererParams: { name: 'unit_price' },
      },
      {
        field: 'discount_rate',
        headerName: 'Discount Rate',
        minWidth: 100,
        valueFormatter: ({ value }) => printPercentage(value),
        cellRenderer: ControlledTextEditor,
        cellRendererParams: { name: 'discount_rate' },
      },
      {
        field: 'total',
        headerName: 'Total Cost',
        minWidth: 100,
        valueGetter: ({ getValue }) =>
          getValue('unit_price') *
          getValue('quantity') *
          (1 - (getValue('discount_rate') || 0)),
        valueFormatter: ({ value }) => printAmount(value),
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
      {!isReadOnly && supplier && (
        <SupplierInvoiceLinesAddDialog
          supplier={supplier}
          onAddLines={handleAddRows}
        />
      )}
    </Card>
  )
}

export default SupplierInvoiceLinesFieldArray
