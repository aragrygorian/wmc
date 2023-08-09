import React, { useEffect, useMemo, useState } from 'react'
import { printNumber, printPercentage } from '@gravis-os/utils'
import { DataTable, DataTableProps } from '@gravis-os/crud'
import { Button, Card, MoreIconButton, Stack } from '@gravis-os/ui'
import { useFieldArray, useWatch } from 'react-hook-form'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { last, omit } from 'lodash'
import { getEditableColumnTypes } from '@admin/utils/getEditableColumnTypes'
import { SalesOrderLine } from '@admin/modules/SalesOrder/types'
import { getNetUnitPriceFromLine } from '@admin/modules/Quotation/utils'
import { parsePercentage } from '@admin/modules/Quotation/utils/parsePercentage'
import {
  getRetailPriceAmount,
  getSalespersonCostAmount,
} from '../../Product/productUtils'
import productModule from '../../Product/productModule'
import ControlledTextEditor from '../../../components/editors/ControlledTextEditor'

const SalesOrderLinesFieldArray = (props) => {
  const { formContext, isReadOnly, item } = props
  const { control, setValue } = formContext

  const [sortable, setSortable] = useState(true)

  const name = 'lines'
  const defaultRow = {
    position: 0,
    sales_order_id: item?.id,
    quantity: 1,
  }

  const rows = useWatch({ name, control, defaultValue: [defaultRow] })

  const fieldArray = useFieldArray({ control, name })
  const { append } = fieldArray

  const handleAddRowClick = () => {
    const lastRow = rows[rows.length - 1]
    return append({
      quantity: 1,
      position: (lastRow?.position ?? -1) + 1,
      sales_order_id: lastRow?.quotation_id,
      created_at: lastRow?.created_at,
      updated_at: lastRow?.updated_at,
      created_by: lastRow?.created_by,
      updated_by: lastRow?.updated_by,
    })
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
        suppressMenu: true,
        cellRenderer: ControlledTextEditor,
        cellRendererParams: { name: 'position' },
        valueFormatter: ({ value }) => value + 1,
      },
      {
        type: 'editableTextColumn',
        field: 'location_code',
        headerName: 'Location Code',
        minWidth: 100,
        cellRendererParams: { name: 'location_code' },
        cellEditorParams: { name: 'location_code' },
      },
      {
        cellStyle: { padding: 0, height: '100%' },
        minWidth: 325,
        field: 'product_id',
        headerName: 'Product Name',
        valueGetter: ({ data }) => data?.product?.title,
        cellRenderer: 'ModelFieldEditor',
        cellRendererParams: {
          module: productModule,
          filters: [{ pk: 'model_code', op: 'ilike' }],
          setQuery: async ({ inputValue, select }) => {
            return supabaseClient
              .rpc('search_product', { search_value: inputValue })
              .select(select)
          },
          renderOption: ({ option, pk }) =>
            `${option.brand.code}${option.model_code} - ${option[pk]}`,
          setValue,
          fieldArray,
          control,
          label: false,
          sx: { width: 325 },
        },
        cellEditor: 'ModelFieldEditor',
        cellEditorParams: {
          module: productModule,
          filters: [{ pk: 'model_code', op: 'ilike' }],
          setQuery: async ({ inputValue, select }) => {
            return supabaseClient
              .rpc('search_product', { search_value: inputValue })
              .select(select)
          },
          renderOption: ({ option, pk }) =>
            `${option.brand.code}${option.model_code} - ${option[pk]}`,
          setValue,
          fieldArray,
          control,
          label: false,
          sx: { width: 325 },
        },
      },
      {
        type: 'editableNumberColumn',
        field: 'quantity',
        minWidth: 120,
        cellRendererParams: { name: 'quantity' },
        cellEditorParams: { name: 'quantity' },
      },
      {
        field: 'retail_price_amount',
        headerName: 'Retail Price',
        minWidth: 100,
        valueGetter: ({ data }) =>
          getRetailPriceAmount({ ...data?.product, ...data?.product?.brand }),
        valueFormatter: ({ value }) => printNumber(value, { dp: 2 }),
      },
      {
        type: 'editableTextColumn',
        field: 'note',
        enableRowGroup: true,
        cellRendererParams: { name: 'note' },
        cellEditorParams: { name: 'note' },
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
        field: 'unit_price',
        headerName: 'Net Unit Price',
        minWidth: 100,
        valueGetter: ({ data }) => getNetUnitPriceFromLine(data),
        valueFormatter: ({ value }) => printNumber(value, { dp: 2 }),
      },
      {
        field: 'salesperson_cost_amount',
        headerName: 'Salesperson Cost',
        minWidth: 150,
        valueGetter: ({ data }) =>
          getSalespersonCostAmount({
            ...data?.product,
            ...data?.product?.brand,
          }),
        valueFormatter: ({ value }) => printNumber(value, { dp: 2 }),
      },
      {
        field: 'unit_subtotal',
        headerName: 'Subtotal',
        minWidth: 110,
        valueGetter: ({ data }) =>
          getNetUnitPriceFromLine(data) * data?.quantity,
        valueFormatter: ({ value }) => printNumber(value, { dp: 2 }),
      },
      {
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
            ]}
          />
        ),
      },
    ]
  }, [sortable])

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

  useEffect(() => {
    // Append new line when selecting menu item
    const lastRow = last(rows) as Partial<SalesOrderLine>
    if (lastRow?.product_id && !isReadOnly)
      append({ ...defaultRow, position: (lastRow?.position ?? -1) + 1 })
  }, [JSON.stringify(rows), isReadOnly])

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

      {!isReadOnly && (
        <Button startIcon={<AddOutlinedIcon />} onClick={handleAddRowClick}>
          Add Row
        </Button>
      )}
    </Card>
  )
}

export default SalesOrderLinesFieldArray
