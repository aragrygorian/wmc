import React, { useEffect, useMemo, useState } from 'react'
import { printAmount, printPercentage } from '@gravis-os/utils'
import { DataTable, DataTableProps } from '@gravis-os/crud'
import { Button, Card, MoreIconButton, Stack } from '@gravis-os/ui'
import { Controller, useFieldArray, useWatch } from 'react-hook-form'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { last, omit } from 'lodash'
import { Box } from '@mui/material'
import { ColDef } from 'ag-grid-community'
import ControlledTextEditor from '../../../components/editors/ControlledTextEditor'
import InvoiceLinesAddDialog from './InvoiceLinesAddDialog'
import { getEditableColumnTypes } from '../../../utils/getEditableColumnTypes'
import { InvoiceType } from '../constants'
import { InvoiceLine } from '../types'

// TODO: Add types
const InvoiceLinesFieldArray = (props) => {
  const { formContext, isReadOnly, item } = props
  const { control, setValue } = formContext

  const [sortable, setSortable] = useState(true)

  const [salesOrder, type] = useWatch({ name: ['sales_order_id', 'type'] })
  const isLumpSumType = type === InvoiceType.LumpSum

  const name = 'lines'
  const defaultRow = {
    invoice_id: item?.id,
    quantity: 1,
    position: 0,
  }
  const rows = useWatch({
    name,
    control,
    defaultValue: isLumpSumType ? [defaultRow] : [],
  })
  const fieldArray = useFieldArray({ control, name })
  const { append, fields } = fieldArray

  const handleAddLumpSumRow = () => {
    const lastRow = last<InvoiceLine>(rows)
    return append({
      position: (lastRow?.position ?? -1) + 1,
      invoice_id: lastRow?.invoice_id,
      quantity: 1,
    })
  }

  const handleAddItemisedRows = (lines) => {
    const nextRows = lines.map((line, index) => ({
      ...line,
      title: line.product.title,
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
  const columnDefs = useMemo<ColDef[]>(() => {
    const defaultLeftColumns = [
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
        colId: 'position',
        maxWidth: 50,
        field: 'position',
        headerName: '#',
        suppressMenu: true,
        cellRenderer: ControlledTextEditor,
        cellRendererParams: { name: 'position' },
        valueFormatter: ({ value }) => value + 1,
      },
    ].filter(({ colId }) => !isReadOnly || ['position'].includes(colId))

    const defaultRightColumns = [
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
    ].filter(() => !isReadOnly)

    return [
      ...defaultLeftColumns,
      {
        type: 'editableTextColumn',
        field: 'location_code',
        headerName: 'Location Code',
        minWidth: 100,
        cellRendererParams: { name: 'location_code' },
        cellEditorParams: { name: 'location_code' },
      },
      {
        field: 'title',
        minWidth: 225,
        type: 'editableTextColumn',
        cellRendererParams: { name: 'title' },
        cellEditorParams: { name: 'title' },
        hide: !isLumpSumType,
      },
      {
        field: 'desc',
        headerName: 'Description',
        minWidth: 300,
        type: 'editableTextColumn',
        cellRendererParams: { name: 'description' },
        cellEditorParams: { name: 'description' },
        hide: !isLumpSumType,
      },
      {
        field: 'product.model_code',
        headerName: 'Model Code',
        minWidth: 120,
        maxWidth: 120,
        hide: isLumpSumType,
      },
      {
        minWidth: 325,
        field: 'product.title',
        headerName: 'Product Name',
        hide: isLumpSumType,
      },
      {
        field: 'note',
        type: 'editableTextColumn',
        minWidth: 100,
        maxWidth: 100,
        cellRendererParams: { name: 'note' },
        cellEditorParams: { name: 'note' },
        hide: isLumpSumType,
      },
      {
        field: 'quantity',
        headerName: 'Qty',
        minWidth: 100,
        type: 'editableNumberColumn',
        cellRendererParams: { name: 'quantity' },
        cellEditorParams: { name: 'quantity' },
      },
      {
        field: 'unit_price',
        headerName: 'Unit Price',
        minWidth: 150,
        valueFormatter: ({ value }) => printAmount(value),
        type: 'editableNumberColumn',
        cellRendererParams: { name: 'unit_price' },
        cellEditorParams: { name: 'unit_price' },
        editable: isLumpSumType,
      },
      {
        field: 'discount_rate',
        headerName: 'Discount Rate',
        minWidth: 100,
        valueFormatter: ({ value }) => printPercentage(value),
        cellRenderer: ControlledTextEditor,
        cellRendererParams: { name: 'discount_rate' },
        hide: isLumpSumType,
      },
      {
        field: 'total',
        minWidth: 100,
        valueGetter: ({ data }) => data.unit_price * data.quantity,
        valueFormatter: ({ value }) => printAmount(value),
      },
      ...defaultRightColumns,
    ]
  }, [rows, sortable, isReadOnly, type])

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
    onCellEditingStopped: () => {
      // Append new row after last row was filled
      const lastRow = last(rows) as Partial<InvoiceLine>
      if (isLumpSumType && lastRow?.title) handleAddLumpSumRow()
    },
    suppressClickEdit: isReadOnly,
    singleClickEdit: true,
    context: { name },
  }

  useEffect(() => {
    // Append initial row when empty
    if (!fields.length && !isReadOnly && isLumpSumType) append(defaultRow)
  }, [isReadOnly, isLumpSumType])

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
      {isLumpSumType && !isReadOnly && (
        <Button startIcon={<AddOutlinedIcon />} onClick={handleAddLumpSumRow}>
          Add Row
        </Button>
      )}
      {!isLumpSumType && !isReadOnly && salesOrder && (
        <InvoiceLinesAddDialog
          salesOrder={salesOrder}
          onAddLines={handleAddItemisedRows}
        />
      )}
    </Card>
  )
}

export default InvoiceLinesFieldArray
