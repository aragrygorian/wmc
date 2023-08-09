import React, { useEffect, useMemo, useState } from 'react'
import { printAmount, printPercentage } from '@gravis-os/utils'
import { DataTable, DataTableProps } from '@gravis-os/crud'
import { Button, Card, MoreIconButton, Stack } from '@gravis-os/ui'
import { Controller, useFieldArray, useWatch } from 'react-hook-form'
import {
  AddOutlined as AddOutlinedIcon,
  ContentCopyOutlined as ContentCopyOutlinedIcon,
} from '@mui/icons-material'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { get, last, omit } from 'lodash'
import { getEditableColumnTypes } from '@admin/utils/getEditableColumnTypes'
import Observer from '@admin/components/Observer'
import usePdfPrint from '@admin/hooks/usePdfPrint'
import PrintTable from '@admin/components/PrintTable'
import QuotationLineDiscountApprovalDialogButton from '@admin/modules/Quotation/components/QuotationLineDiscountApproval/QuotationLineDiscountApprovalDialogButton'
import QuotationLineApproveButton from '@admin/modules/Quotation/components/QuotationLineDiscountApproval/QuotationLineApproveButton'
import QuotationLineRejectButton from '@admin/modules/Quotation/components/QuotationLineDiscountApproval/QuotationLineRejectButton'
import { useIsAuthorised } from '@admin/modules/Quotation/hooks/useIsAuthorised'
import productModule from '../../Product/productModule'
import { parsePercentage } from '../utils/parsePercentage'
import { QuotationLine } from '../types'
import ControlledTextEditor from '../../../components/editors/ControlledTextEditor'
import getQuotationLineDiscountRate from '../utils/getQuotationLineDiscountRate'
import QuotationProjectProductDiscountsField from './QuotationProjectProductDiscountsField'
import QuotationProjectBrandDiscountsField from './QuotationProjectBrandDiscountsField'
import useRetailPriceCellRenderer from '../hooks/useRetailPriceCellRenderer'
import useNetRetailPriceCellRenderer from '../hooks/useNetRetailPriceCellRenderer'
import useSalesPersonCostCellRenderer from '../hooks/useSalesPersonCostCellRenderer'
import useLineTotalCellRenderer from '../hooks/useLineTotalCellRenderer'

// TODO: Add types
const QuotationLinesFieldArray = (props) => {
  const { formContext, isReadOnly, item } = props
  const { control, setValue } = formContext

  const { canApproveDiscount, canRequestDiscount } = useIsAuthorised()

  const { isPrintMode } = usePdfPrint()

  const [sortable, setSortable] = useState(true)

  const name = 'lines' as const
  const defaultRow = {
    position: 0,
    quotation_id: item?.id,
    quantity: 1,
  }

  const [rows = [defaultRow], currencyRateValue] = useWatch({
    name: [name, 'currency_rate'],
    control,
  })
  const currencyRate = currencyRateValue || 1

  const fieldArray = useFieldArray({ control, name })
  const { append, update, fields } = fieldArray

  const handleAddRowClick = () => {
    const lastRow = rows[rows.length - 1]
    return append({
      position: (lastRow?.position ?? -1) + 1,
      quotation_id: lastRow?.quotation_id,
      quantity: 1,
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
        suppressMenu: true,
        cellRenderer: ControlledTextEditor,
        cellRendererParams: { name: 'position' },
        hide: isPrintMode,
        valueFormatter: ({ value }) => value + 1,
      },
      {
        type: 'editableTextColumn',
        field: 'location_code',
        headerName: 'Location Code',
        minWidth: isPrintMode ? 90 : 100,
        cellRendererParams: { name: 'location_code' },
        cellEditorParams: { name: 'location_code' },
      },
      isPrintMode
        ? {
            cellStyle: { padding: 0, height: '100%' },
            minWidth: 225,
            field: 'product_id',
            headerName: 'Product Name',
            valueGetter: ({ data }) => data?.product?.title,
          }
        : {
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
        minWidth: isPrintMode ? 90 : 120,
        cellRendererParams: { name: 'quantity' },
        cellEditorParams: { name: 'quantity' },
      },
      {
        field: 'retail_price_amount',
        headerName: 'Retail Price',
        minWidth: isPrintMode ? 80 : 100,
        cellRenderer: (props) => {
          const retailPrice = useRetailPriceCellRenderer(props)
          return printAmount(retailPrice * currencyRate)
        },
      },
      {
        type: 'editableTextColumn',
        field: 'note',
        enableRowGroup: true,
        cellRendererParams: { name: 'note' },
        cellEditorParams: { name: 'note' },
        hide: isPrintMode,
      },
      {
        type: 'editableNumberColumn',
        editable: false,
        field: 'discount_rate',
        headerName: 'Discount Rate',
        flex: 0,
        minWidth: isPrintMode ? 100 : 150,
        valueFormatter: ({ data, value }) =>
          printPercentage(get(data, 'requested_discount_rate') || value, {
            dp: 2,
          }),
        valueParser: ({ newValue }) => parsePercentage(newValue),
        cellRenderer: (args) => {
          const { data = {} } = args || {}
          const hasDiscountRate = Boolean(get(data, 'requested_discount_rate'))

          return (
            <Stack direction="row">
              <ControlledTextEditor
                {...args}
                name="discount_rate"
                typographyProps={{
                  sx: {
                    color: get(data, 'requested_discount_rate')
                      ? 'status.red.light'
                      : 'inherit',
                  },
                }}
              />
              {canApproveDiscount && hasDiscountRate && (
                <Stack direction="row" gap={0.5} sx={{ ml: -0.75 }}>
                  <QuotationLineApproveButton line={data} />
                  <QuotationLineRejectButton line={data} />
                </Stack>
              )}
            </Stack>
          )
        },
      },
      {
        field: 'unit_price',
        headerName: 'Net Unit Price',
        minWidth: 100,
        cellRenderer: (props) => {
          const netRetailPrice = useNetRetailPriceCellRenderer(props)
          return printAmount(netRetailPrice * currencyRate)
        },
      },
      {
        field: 'salesperson_cost_amount',
        headerName: 'Salesperson Cost',
        minWidth: 150,
        hide: isPrintMode,
        cellRenderer: (props) => {
          const salesPersonCost = useSalesPersonCostCellRenderer(props)
          return printAmount(salesPersonCost * currencyRate)
        },
      },
      {
        field: 'unit_subtotal',
        headerName: 'Subtotal',
        minWidth: 110,
        cellRenderer: (props) => {
          const lineTotal = useLineTotalCellRenderer(props)
          return printAmount(lineTotal * currencyRate)
        },
      },
      {
        maxWidth: 80,
        suppressMenu: true,
        field: 'actions',
        hide: isPrintMode,
        cellRenderer: ({ data, rowIndex }) => (
          <MoreIconButton>
            {() => (
              <Stack>
                <Button
                  onClick={() => handleDuplicateRow(data, rowIndex)}
                  variant="text"
                  color="inherit"
                  sx={{
                    justifyContent: 'flex-start',
                    px: 2,
                  }}
                  startIcon={<ContentCopyOutlinedIcon fontSize="small" />}
                >
                  Duplicate
                </Button>
                {canRequestDiscount && (
                  <QuotationLineDiscountApprovalDialogButton
                    line={data}
                    onSubmit={(requestedDiscountRate) =>
                      update(rowIndex, {
                        ...data,
                        requested_discount_rate: requestedDiscountRate,
                      })
                    }
                  />
                )}
              </Stack>
            )}
          </MoreIconButton>
        ),
      },
    ].filter(Boolean)
  }, [currencyRate, rows, sortable, isPrintMode])

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
    const lastRow = last(rows) as Partial<QuotationLine>
    if (lastRow?.product_id && !isReadOnly)
      append({ ...defaultRow, position: (lastRow?.position ?? -1) + 1 })
  }, [JSON.stringify(rows), isReadOnly])

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
            name={`${name}.${index}.discount_rate`}
            observedFields={[
              'company_id',
              'project_id',
              `${name}.${index}.product`,
              `${name}.${index}.product_id`,
            ]}
            getValue={getQuotationLineDiscountRate}
          />
        </React.Fragment>
      ))}

      {/* Project Discounts */}
      <Controller
        name="project_brand_discounts"
        control={control}
        render={({ field }) => (
          <QuotationProjectBrandDiscountsField {...field} />
        )}
      />
      <Controller
        name="project_product_discounts"
        control={control}
        render={({ field }) => (
          <QuotationProjectProductDiscountsField {...field} />
        )}
      />

      {!isReadOnly && (
        <Button startIcon={<AddOutlinedIcon />} onClick={handleAddRowClick}>
          Add Row
        </Button>
      )}
    </Card>
  )
}

export default QuotationLinesFieldArray
