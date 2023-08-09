import React, { useMemo, useState } from 'react'
import { printAmount } from '@gravis-os/utils'
import { DataTable, DataTableProps } from '@gravis-os/crud'
import { Button, Card, MoreIconButton, Stack } from '@gravis-os/ui'
import { Controller, useFieldArray, useWatch } from 'react-hook-form'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { omit } from 'lodash'
import Observer from '@admin/components/Observer'
import { Box } from '@mui/material'
import usePdfPrint from '@admin/hooks/usePdfPrint'
import PrintTable from '@admin/components/PrintTable'
import { ColDef } from 'ag-grid-community'
import ControlledTextEditor from '../../../components/editors/ControlledTextEditor'
import PurchaseOrderLinesAddDialog from './PurchaseOrderLinesAddDialog'
import { getEditableColumnTypes } from '../../../utils/getEditableColumnTypes'
import ModuleLink from '../../../components/ModuleLink'
import { orderFormModule } from '../../OrderForm/orderFormConfig'

// TODO: Add types
const PurchaseOrderLinesFieldArray = (props) => {
  const { formContext, isReadOnly } = props
  const { control, setValue } = formContext

  const { isPrintMode } = usePdfPrint()

  const [sortable, setSortable] = useState(true)

  const name = 'lines'
  const [rows = [], currencyRate = 1] = useWatch({
    name: [name, 'currency_rate'],
    control,
  })
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
    return (
      [
        {
          colId: 'drag',
          rowDrag: sortable,
          maxWidth: 30,
          suppressMenu: true,
          hide: isPrintMode,
        },
        {
          colId: 'checkbox',
          maxWidth: 50,
          checkboxSelection: true,
          suppressMenu: true,
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          hide: isPrintMode,
        },
        {
          maxWidth: 50,
          field: 'position',
          headerName: '#',
          cellRenderer: ({ data, node }) =>
            (data.position ?? node.rowIndex) + 1,
          suppressMenu: true,
          hide: isPrintMode,
        },
        {
          field: 'product.barcode',
          headerName: 'Barcode',
          minWidth: 100,
          maxWidth: 100,
        },
        {
          field: 'product.model_code',
          headerName: 'Model Code',
          minWidth: 120,
          maxWidth: 120,
          valueFormatter: ({ value }) => value && `#${value}`,
        },
        {
          minWidth: 325,
          field: 'product_id',
          headerName: 'Product Name',
          valueGetter: ({ data }) => data?.product?.title,
        },
        {
          field: 'order_form_line_id',
          headerName: 'Ref',
          valueGetter: ({ data }) =>
            data?.order_form_line?.order_form?.title || 'Company Stock',
          cellRenderer: ({ data, value }) =>
            value === 'Company Stock' ? (
              value
            ) : (
              <ModuleLink
                module={orderFormModule}
                item={data.order_form_line?.order_form}
              />
            ),
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
          type: 'editableTextColumn',
          headerName: 'Order Qty',
          minWidth: 100,
          cellRendererParams: { name: 'quantity' },
          cellEditorParams: { name: 'quantity' },
        },
        {
          field: 'product.supplier_cost_amount',
          headerName: 'Unit Price',
          minWidth: 100,
          valueGetter: ({ data }) =>
            data.unit_price ?? data.product.supplier_cost_amount * currencyRate,
          valueFormatter: ({ value }) => printAmount(value),
          cellRenderer: ControlledTextEditor,
          cellRendererParams: { name: 'unit_price' },
        },
        {
          field: 'unit_price',
          headerName: 'Total Cost',
          minWidth: 100,
          valueGetter: ({ data }) =>
            data.product.supplier_cost_amount * data.quantity * currencyRate,
          valueFormatter: ({ value }) => printAmount(value),
        },
        {
          colId: 'actions',
          maxWidth: 80,
          suppressMenu: true,
          field: 'actions',
          hide: isPrintMode,
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
      ] as ColDef[]
    )
      .filter(Boolean)
      .filter(
        ({ colId }) =>
          !isReadOnly ||
          !colId ||
          !['actions', 'drag', 'checkbox'].includes(colId)
      )
  }, [currencyRate, rows, sortable, isReadOnly])

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
    groupDisplayType: 'groupRows' as any,
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

  if (isPrintMode) return <PrintTable columnDefs={columnDefs} rows={rows} />

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
        <React.Fragment key={`${name}-${id}`}>
          <Controller
            name={`${name}.${index}.id`}
            control={control}
            defaultValue={id}
            render={({ field }) => <input hidden disabled {...field} />}
          />
          <Observer
            formContext={formContext}
            name={`${name}.${index}.unit_price`}
            observedFields={[`${name}.${index}.product`]}
            getValue={([product]) =>
              product.supplier_cost_amount * currencyRate
            }
          />
        </React.Fragment>
      ))}
      {!isReadOnly && supplier && (
        <PurchaseOrderLinesAddDialog
          supplier={supplier}
          onAddLines={handleAddRows}
        />
      )}
    </Card>
  )
}

export default PurchaseOrderLinesFieldArray
