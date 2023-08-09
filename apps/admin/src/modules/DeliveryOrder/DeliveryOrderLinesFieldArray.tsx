import PrintTable from '@admin/components/PrintTable'
import usePdfPrint from '@admin/hooks/usePdfPrint'
import { DataTable, DataTableProps } from '@gravis-os/crud'
import { Button, Card, MoreIconButton, Stack } from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { Box } from '@mui/material'
import { ColDef } from 'ag-grid-community'
import { first, groupBy, omit, sumBy, toNumber } from 'lodash'
import React, { useMemo, useState } from 'react'
import { Controller, useFieldArray, useWatch } from 'react-hook-form'
import { getEditableColumnTypes } from '../../utils/getEditableColumnTypes'
import { useFetchReservations } from '../Reservation/hooks/useFetchReservations'
import { useFetchSalesOrderLines } from '../SalesOrder/hooks/useFetchSalesOrderLines'
import DeliveryOrderLinesAddDialog from './DeliveryOrderLinesAddDialog'
import DeliveryOrderLinesDeliveredQuantityCell from './DeliveryOrderLinesDeliveredQuantityCell'

const DeliveryOrderLinesFieldArray = (props) => {
  const { formContext, isReadOnly } = props
  const { control, setValue } = formContext

  const { isPrintMode } = usePdfPrint()

  const [sortable, setSortable] = useState(true)

  const name = 'lines'
  const rows = useWatch({ name, control }) || []
  const fieldArray = useFieldArray({ control, name })
  const { fields, replace } = fieldArray

  const salesOrder = useWatch({ control, name: 'sales_order_id' })

  const { data: salesOrderLines } = useFetchSalesOrderLines(
    {
      match: {
        sales_order_id: salesOrder?.id,
      },
    },
    { enabled: Boolean(salesOrder?.id) }
  )

  const { data: reservations = [] } = useFetchReservations(
    {
      match: {
        'order_form_line.order_form.sales_order_id': salesOrder?.id,
      },
      select:
        '*, order_form_line!inner(*, order_form!inner(*)), purchase_order_line(*, inventory(*))',
    },
    { enabled: Boolean(salesOrder?.id) }
  )

  const handleAddRows = (lines) => {
    const nextLines = Object.values(
      groupBy([...rows, ...lines], 'product_id')
    ).map((lines, index) => {
      const nextLine = first(lines)

      return {
        ...nextLine,
        quantity: sumBy(lines, (line) => toNumber(line.quantity)),
        position: nextLine?.position
          ? nextLine.position
          : fields.length + index,
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
          type: 'editableTextColumn',
          field: 'location_code',
          headerName: 'Location',
          minWidth: 100,
          cellRendererParams: { name: 'location_code' },
          cellEditorParams: { name: 'location_code' },
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
          field: 'note',
          type: 'editableTextColumn',
          minWidth: 100,
          maxWidth: 100,
          cellRendererParams: { name: 'note' },
          cellEditorParams: { name: 'note' },
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
          field: 'delivered_quantity',
          headerName: 'Qty Delivered',
          minWidth: 220,
          resizable: true,
          cellRenderer: ({ data }) => (
            <DeliveryOrderLinesDeliveredQuantityCell
              deliveredQuantity={data.delivered_quantity}
              totalQuantity={data.quantity}
            />
          ),
        },
        {
          field: 'unit_price',
          headerName: 'Net Unit Price',
          minWidth: 100,
          valueFormatter: ({ value }) => printAmount(value),
        },
        {
          field: 'subtotal',
          minWidth: 100,
          valueGetter: isPrintMode
            ? ({ data }) => (data?.unit_price || 0) * (data?.quantity || 0)
            : ({ getValue }) =>
                (getValue('unit_price') || 0) * getValue('quantity'),
          valueFormatter: ({ value }) => printAmount(value),
        },
        {
          field: 'reason',
          headerName: 'Reason',
          minWidth: 200,
        },
        {
          field: 'remark',
          headerName: 'Remark',
          minWidth: 350,
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
        <Controller
          key={`${name}-${id}`}
          name={`${name}.${index}.id`}
          control={control}
          defaultValue={id}
          render={({ field }) => <Box hidden component="input" {...field} />}
        />
      ))}
      {!isReadOnly && salesOrderLines && (
        <DeliveryOrderLinesAddDialog
          reservations={reservations}
          salesOrder={salesOrder}
          salesOrderLines={salesOrderLines}
          onAddLines={handleAddRows}
        />
      )}
    </Card>
  )
}

export default DeliveryOrderLinesFieldArray
