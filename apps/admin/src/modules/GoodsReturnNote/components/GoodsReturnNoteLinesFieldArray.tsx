import React, { useMemo, useState } from 'react'
import { DataTable, DataTableProps } from '@gravis-os/crud'
import { Button, Card, MoreIconButton, Stack } from '@gravis-os/ui'
import { Controller, useFieldArray, useWatch } from 'react-hook-form'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { omit } from 'lodash'
import { Box } from '@mui/material'
import { ColDef } from 'ag-grid-community'
import { getEditableColumnTypes } from '@admin/utils/getEditableColumnTypes'
import GoodsReturnNoteLinesAddDialog from '@admin/modules/GoodsReturnNote/components/GoodsReturnNoteAddDialog'

const GoodsReturnNoteLinesFieldArray = (props) => {
  const { formContext, isReadOnly } = props
  const { control, setValue } = formContext

  const [sortable, setSortable] = useState(true)

  const [invoice, type] = useWatch({ control, name: ['invoice_id', 'type'] })

  const name = 'lines'

  const rows = useWatch({
    name,
    control,
    defaultValue: [],
  })
  const fieldArray = useFieldArray({ control, name })
  const { append, fields } = fieldArray

  const handleAddLines = (lines) => {
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
  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        colId: 'drag',
        rowDrag: sortable,
        maxWidth: 30,
        suppressMenu: true,
      },
      {
        colId: 'position',
        maxWidth: 50,
        field: 'position',
        headerName: '#',
        cellRenderer: ({ data, node }) => (data.position ?? node.rowIndex) + 1,
        suppressMenu: true,
      },
      {
        field: 'location_code',
        headerName: 'Location Code',
        minWidth: 100,
      },
      {
        field: 'title',
        minWidth: 225,
        type: 'editableTextColumn',
        cellRendererParams: { name: 'title' },
        cellEditorParams: { name: 'title' },
      },
      {
        field: 'product.model_code',
        headerName: 'Model Code',
        minWidth: 120,
        maxWidth: 120,
      },
      {
        minWidth: 325,
        field: 'product.title',
        headerName: 'Product Name',
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
        field: 'quantity',
        headerName: 'Qty',
        minWidth: 100,
        type: 'editableNumberColumn',
        cellRendererParams: { name: 'quantity' },
        cellEditorParams: { name: 'quantity' },
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
    ],
    [rows, sortable, isReadOnly, type]
  )

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
      {!isReadOnly && invoice && (
        <GoodsReturnNoteLinesAddDialog
          invoice={invoice}
          onAddLines={handleAddLines}
          dialogButtonProps={{
            title: 'Add Row',
            buttonProps: { startIcon: <AddOutlinedIcon /> },
          }}
        />
      )}
    </Card>
  )
}

export default GoodsReturnNoteLinesFieldArray
