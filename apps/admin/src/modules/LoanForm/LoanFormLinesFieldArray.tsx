import React, { useEffect, useState } from 'react'
import { printNumber } from '@gravis-os/utils'
import { DataTable, DataTableProps } from '@gravis-os/crud'
import { Button, Card, MoreIconButton, Stack } from '@gravis-os/ui'
import { Controller, useFieldArray, useWatch } from 'react-hook-form'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { last, omit } from 'lodash'
import { Box } from '@mui/material'
import { Inventory } from '@prisma/client'
import { getRetailPriceAmount } from '../Product/productUtils'
import productModule from '../Product/productModule'
import { getEditableColumnTypes } from '../../utils/getEditableColumnTypes'
import { warehouseModule } from '../Warehouse/warehouseConfig'
import { LoanFormLine } from './types'
import { useFetchInventories } from '../Inventory/hooks/useFetchInventories'
import { getInstock } from '../Inventory/utils/getInstock'
import ControlledTextEditor from '../../components/editors/ControlledTextEditor'

const LoanFormLinesFieldArray = (props) => {
  const { formContext, isReadOnly, item } = props
  const { control, setValue } = formContext

  const [sortable, setSortable] = useState(true)

  const name = 'lines'
  const defaultRow = {
    loan_form_id: item?.id,
    position: 0,
  }

  const rows = useWatch({ name, control, defaultValue: [defaultRow] })

  const match = rows
    .filter(({ product, warehouse }) => product?.id && warehouse?.id)
    .map(({ product, warehouse }) => ({
      product_id: product.id,
      warehouse_id: warehouse.id,
    }))

  const { data: inventories } = useFetchInventories(
    {
      match,
      select: '*',
    },
    { enabled: Boolean(match.length) }
  )

  const fieldArray = useFieldArray({ control, name })
  const { append, fields } = fieldArray

  const handleAddRowClick = () => {
    const lastRow = rows[rows.length - 1]
    return append({
      position: (lastRow?.position ?? -1) + 1,
      loan_form_id: lastRow?.loan_form_id,
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

  const getInstockFromLoanFormLine = (
    data: LoanFormLine,
    inventories: Inventory[] = []
  ) =>
    getInstock(
      inventories?.filter(
        ({ product_id, warehouse_id }) =>
          product_id === data?.product?.id &&
          warehouse_id === data?.warehouse?.id
      )
    )

  const columnDefs = [
    {
      rowDrag: sortable,
      maxWidth: 30,
      suppressMenu: true,
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
      field: 'product.barcode',
      minWidth: 120,
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
      cellStyle: { padding: 0, height: '100%' },
      minWidth: 325,
      field: 'warehouse_id',
      headerName: 'Dispatch From',
      valueGetter: ({ data }) => data?.warehouse?.title,
      cellRenderer: 'ModelFieldEditor',
      cellRendererParams: {
        module: warehouseModule,
        filters: [{ pk: 'title', op: 'ilike' }],
        setQuery: async ({ inputValue, select }) => {
          return supabaseClient
            .rpc('search_warehouse', { search_value: inputValue })
            .select(select)
        },
        renderOption: ({ option }) => option.title,
        setValue,
        fieldArray,
        control,
        label: false,
        sx: { width: 325 },
      },
      cellEditor: 'ModelFieldEditor',
      cellEditorParams: {
        module: warehouseModule,
        filters: [{ pk: 'title', op: 'ilike' }],
        setQuery: async ({ inputValue, select }) => {
          return supabaseClient
            .rpc('search_warehouse', { search_value: inputValue })
            .select(select)
        },
        renderOption: ({ option }) => option.title,

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
      editable: ({ data }) => {
        const isWarehouseProductSelected =
          data?.product?.id && data?.warehouse?.id
        const instock = getInstockFromLoanFormLine(data, inventories)

        return isWarehouseProductSelected && instock > 0
      },
      cellRendererParams: { name: 'quantity' },
      cellEditorParams: { name: 'quantity' },
    },
    {
      field: 'instock',
      headerName: 'Instock',
      minWidth: 120,
      valueGetter: ({ data }) => {
        const isWarehouseProductSelected =
          data?.product?.id && data?.warehouse?.id

        if (!isWarehouseProductSelected) return '-'

        const instock = getInstockFromLoanFormLine(data, inventories)

        return isWarehouseProductSelected && instock > 0 ? instock : 0
      },
    },
    {
      field: 'unit_price',
      headerName: 'Amount',
      minWidth: 150,
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
  ].map((columnDef) => ({ ...columnDef }))

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
    const lastRow = last(rows) as Partial<LoanFormLine>
    if (lastRow?.product_id && !isReadOnly)
      append({ ...defaultRow, position: rows.length })
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
      {fields.map(({ id }, index) => (
        <Controller
          key={`${name}-${id}`}
          name={`${name}.${index}.id`}
          control={control}
          defaultValue={id}
          render={({ field }) => <Box hidden component="input" {...field} />}
        />
      ))}

      {!isReadOnly && (
        <Button startIcon={<AddOutlinedIcon />} onClick={handleAddRowClick}>
          Add Row
        </Button>
      )}
    </Card>
  )
}

export default LoanFormLinesFieldArray
