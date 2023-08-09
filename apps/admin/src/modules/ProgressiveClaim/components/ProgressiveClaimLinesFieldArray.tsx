import React, { useMemo } from 'react'
import { printAmount } from '@gravis-os/utils'
import { DataTable, DataTableProps } from '@gravis-os/crud'
import { Button, Card, Stack } from '@gravis-os/ui'
import {
  Controller,
  useFieldArray,
  UseFormReturn,
  useWatch,
} from 'react-hook-form'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useQuery } from 'react-query'
import { ColDef } from 'ag-grid-community'
import { alpha, Box, useTheme } from '@mui/material'
import { first, orderBy, sumBy } from 'lodash'
import { salesOrderModule } from '../../SalesOrder/salesOrderConfig'
import getProgressiveClaimLineTotal from '../utils/getProgressiveClaimLineTotal'
import { SalesOrder, SalesOrderLine } from '../../SalesOrder/types'
import getProgressiveClaimLineFromSalesOrderLine from '../utils/getProgressiveClaimLineFromSalesOrderLine'
import { getEditableColumnTypes } from '../../../utils/getEditableColumnTypes'

// TODO: Add types
const ProgressiveClaimLinesFieldArray = (props) => {
  const { formContext, isReadOnly } = props
  const { control, reset, getValues } = formContext as UseFormReturn
  const theme = useTheme()

  const name = 'lines'
  const { fields } = useFieldArray({ control, name })
  const [sales_order] = useWatch({ control, name: ['sales_order_id'] })

  const tableName = salesOrderModule.table.name
  const selector = salesOrderModule.select.detail
  const matcher = { id: sales_order?.id }
  const { data: salesOrder } = useQuery({
    queryKey: [tableName, selector, matcher],
    queryFn: async () => {
      const { data: salesOrder } = await supabaseClient
        .from<SalesOrder>(tableName)
        .select(selector)
        .match(matcher)
        .single()
      return salesOrder
    },
    enabled: Boolean(sales_order?.id),
    onSuccess(salesOrder) {
      const formValues = getValues()
      const { lines } = formValues
      if (!lines?.length) {
        reset({
          ...formValues,
          [name]: (salesOrder?.lines as SalesOrderLine[])?.map(
            getProgressiveClaimLineFromSalesOrderLine
          ),
        })
      }
    },
  })
  const deliveryOrders = salesOrder?.delivery_order

  // Formulas
  const columnDefs = useMemo<ColDef[]>(() => {
    return [
      {
        maxWidth: 50,
        field: 'position',
        headerName: '#',
        cellRenderer: ({ data, node }) => (data.position ?? node.rowIndex) + 1,
        suppressMenu: true,
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
        field: 'product.model_code',
        headerName: 'Model Code',
      },
      {
        minWidth: 325,
        field: 'product.title',
        headerName: 'Product Name',
      },
      {
        type: 'editableNumberColumn',
        field: 'quantity',
        headerName: 'Claim Qty',
        minWidth: 120,
        cellRendererParams: { name: 'quantity' },
        cellEditorParams: { name: 'quantity' },
      },
      {
        type: 'editableNumberColumn',
        field: 'approved_quantity',
        headerName: 'App Qty',
        minWidth: 120,
        cellRendererParams: { name: 'approved_quantity' },
        cellEditorParams: { name: 'approved_quantity' },
      },
      {
        field: 'unit_price',
        headerName: 'Unit Price',
        minWidth: 120,
        valueFormatter: ({ value }) => printAmount(value),
      },
      {
        field: 'subtotal',
        minWidth: 100,
        valueGetter: ({ data }) => getProgressiveClaimLineTotal(data),
        valueFormatter: ({ value }) => printAmount(value),
      },
      {
        field: 'delivery_orders',
        headerName: 'DO Reference',
        minWidth: 200,
      },
      {
        field: 'sales_order_line.quantity',
        headerName: 'Total Qty',
        minWidth: 120,
      },
      {
        field: 'previous_quantity',
        headerName: 'Prev Qty',
        headerClass: 'previous-quantity',
        minWidth: 120,
        valueGetter: ({ data }) => {
          const { sales_order_line, created_at } = data
          const { progressive_claim_line: lines = [] } = sales_order_line || {}
          return (
            first(
              orderBy(
                lines.filter((line) => line.created_at < created_at),
                'created_at',
                'desc'
              )
            )?.approved_quantity || 0
          )
        },
      },
      {
        field: 'accumulated_quantity',
        headerName: 'Acc Qty',
        headerClass: 'accumulated-quantity',
        minWidth: 120,
        valueGetter: ({ data, getValue }) => {
          const { sales_order_line, created_at } = data
          const { progressive_claim_line: lines = [] } = sales_order_line || {}
          return (
            sumBy(
              lines.filter((line) => line.created_at < created_at),
              'approved_quantity'
            ) + getValue('approved_quantity')
          )
        },
      },
      {
        field: 'balance_quantity',
        headerName: 'Bal Qty',
        headerClass: 'balance-quantity',
        minWidth: 120,
        valueGetter: ({ getValue }) =>
          (getValue('sales_order_line.quantity') ?? 0) -
          (getValue('accumulated_quantity') ?? 0),
      },
    ]
  }, [isReadOnly])

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
    rowData: getValues(name).map((row) => ({
      ...row,
      delivery_orders: deliveryOrders
        ?.filter(({ lines }) =>
          lines.some(({ product_id }) => product_id === row.product_id)
        )
        .map(({ title }) => title)
        .join(', '),
    })),
    suppressClickEdit: isReadOnly,
    singleClickEdit: true,
    context: { name },
    sx: {
      '.previous-quantity': {
        backgroundColor: alpha(theme.palette.success.light, 0.1),
      },
      '.accumulated-quantity': {
        backgroundColor: alpha(theme.palette.warning.light, 0.1),
      },
      '.balance-quantity': {
        backgroundColor: alpha(theme.palette.error.light, 0.1),
      },
    },
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
    </Card>
  )
}

export default ProgressiveClaimLinesFieldArray
