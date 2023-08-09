import { DataTable, DataTableProps } from '@gravis-os/crud'
import { Button, Stack } from '@gravis-os/ui'
import { printNumber, printPercentage } from '@gravis-os/utils'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import {
  assign,
  dropRight,
  filter,
  has,
  keyBy,
  last,
  map,
  size,
  values,
} from 'lodash'
import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import ControlledTextEditor from '../../../components/editors/ControlledTextEditor'
import { getEditableColumnTypes } from '../../../utils/getEditableColumnTypes'
import productModule from '../../Product/productModule'
import { QUOTATION_LINES_KEY } from '../constants'
import { QuotationIronmongeryProduct } from '../types'
import { getNetUnitPriceFromLine } from '../utils'
import createIronmongeryProduct from '../utils/createIronmongeryProduct'
import { extractIronmongeryProductWithId } from '../utils/extractIronmongeryProduct'
import { parsePercentage } from '../utils/parsePercentage'

export interface QuotationIronmongeryProductRowProps {
  id: string
  setProducts: Dispatch<SetStateAction<QuotationIronmongeryProduct[]>>
}

const enum ColumnDefFields {
  Index = 'index',
  PartNumber = 'part_no',
  Product = 'product',
  Brand = 'brand',
  Quantity = 'quantity',
  UnitPrice = 'unit_price',
  DiscountRate = 'discount_rate',
  TotalCost = 'total_cost',
  TotalPrice = 'total_price',
}

/**
 * Table representing list of products in a single room.
 *
 * `setProducts` function is passed from the parent component to enable data modified
 * in this table to be returned back to the parent component.
 */
const QuotationIronmongeryProductTable: React.FC<
  QuotationIronmongeryProductRowProps
> = (props): React.ReactElement => {
  const { setProducts, id } = props

  const { control, setValue } = useForm()
  const {
    control: contextControl,
    setValue: setContextValue,
    getValues: getContextValues,
  } = useFormContext()

  /* States */
  // Increment used to generate unique ID for each field
  const [incrementId, setIncrementId] = useState<number>(0)

  /* Data */
  const name = `lines` as const
  const rows = useWatch({
    name,
    control,
  })
  const [currencyRate = 1] = useWatch({
    name: ['currency_rate'],
    control: contextControl,
  })

  const { append, fields, remove } = useFieldArray({ control, name })

  /* Functions */
  const handleAddProduct = () => {
    setIncrementId(incrementId + 1)
    return append(createIronmongeryProduct(size(rows)))
  }
  const handleRemoveProduct = () => {
    // Remove from contextLines
    const contextLines = getContextValues(QUOTATION_LINES_KEY)
    setContextValue(
      QUOTATION_LINES_KEY,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filter(contextLines, (line) => line.id !== (last(rows) as any).id)
    )
    // Remove field ID
    remove(size(rows) - 1)
    // Remove actual rows (due to miss-sync of rows and fields)
    return setValue(name, dropRight(rows))
  }
  const getUniqueName = (name: string) => {
    return `${name}-${id}-${incrementId}`
  }
  const onRowDataUpdated = () => {
    setProducts(rows)

    // Get all room lines
    const contextLines = getContextValues(QUOTATION_LINES_KEY)

    // Convert context lines into mapped room -> lines object
    const roomMappings = keyBy(filter(contextLines, 'id'), 'id')

    // Add to roomMappings if room doesn't exist, else update
    map(rows, (row) => {
      const { id } = row
      // If ID already exists in room mappings
      if (has(roomMappings, id)) {
        assign(roomMappings[id], row)
      } else {
        // Else create new ID
        assign(roomMappings, { [id]: row })
      }
    })

    // Update context lines
    setContextValue(
      QUOTATION_LINES_KEY,
      map(values(roomMappings), (line) => extractIronmongeryProductWithId(line))
    )
  }

  /* Column Definition */
  const columnDefs: DataTableProps['columnDefs'] = [
    // Index
    {
      cellStyle: { justifyContent: 'center' },
      maxWidth: 50,
      field: ColumnDefFields.Index,
      headerName: '#',
      suppressMenu: true,
      cellRenderer: ControlledTextEditor,
      cellRendererParams: {
        name: getUniqueName(ColumnDefFields.Index),
      },
      valueFormatter: ({ value }) => value + 1,
    },
    // Part No
    {
      type: 'editableTextColumn',
      field: ColumnDefFields.PartNumber,
      headerName: 'Part #',
      minWidth: 120,
      cellRendererParams: { name: getUniqueName(ColumnDefFields.PartNumber) },
      cellEditorParams: { name: getUniqueName(ColumnDefFields.PartNumber) },
    },
    // Product Name
    {
      cellStyle: { padding: 0, height: '100%' },
      minWidth: 325,
      field: ColumnDefFields.Product,
      headerName: 'Product',
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
        label: false,
        control,

        sx: { width: 325 },
      },
      valueGetter: ({ data }) => data?.product?.title,
    },
    // Brand
    {
      field: ColumnDefFields.Brand,
      minWidth: 100,
      headerName: 'Brand',
      valueGetter: ({ data }) => data?.product?.brand?.title,
    },
    // Quantity
    {
      type: 'editableNumberColumn',
      field: ColumnDefFields.Quantity,
      minWidth: 100,
      headerName: 'Qty',
      cellRendererParams: { name: getUniqueName(ColumnDefFields.Quantity) },
      cellEditorParams: { name: getUniqueName(ColumnDefFields.Quantity) },
    },
    // Unit Price
    {
      field: ColumnDefFields.UnitPrice,
      minWidth: 120,
      headerName: 'Unit Price',
      valueGetter: ({ data }) =>
        getNetUnitPriceFromLine(data, true) * currencyRate,
      valueFormatter: ({ value }) => printNumber(value, { dp: 2 }),
    },
    // Discount Rate
    {
      type: 'editableNumberColumn',
      field: ColumnDefFields.DiscountRate,
      headerName: 'Discount Rate',
      minWidth: 125,
      valueFormatter: ({ value }) => printPercentage(value / 100, { dp: 2 }),
      valueParser: ({ newValue }) => parsePercentage(newValue),
      cellRendererParams: { name: getUniqueName(ColumnDefFields.DiscountRate) },
      cellEditorParams: { name: getUniqueName(ColumnDefFields.DiscountRate) },
    },
    // Total Cost
    {
      field: ColumnDefFields.TotalCost,
      headerName: 'Total Cost',
      minWidth: 120,
      valueGetter: ({ data }) => getNetUnitPriceFromLine(data) * currencyRate,
      valueFormatter: ({ value }) => printNumber(value, { dp: 2 }),
    },
    // Total Price
    {
      field: ColumnDefFields.TotalPrice,
      headerName: 'Total Price',
      minWidth: 120,
      valueGetter: ({ data }) =>
        getNetUnitPriceFromLine(data) *
        currencyRate *
        data?.[ColumnDefFields.Quantity],
      valueFormatter: ({ value }) => printNumber(value, { dp: 2 }),
    },
  ]

  /* Table Props */
  const dataTableProps: DataTableProps = {
    columnDefs,
    columnTypes: getEditableColumnTypes(),
    height: 325,
    rowData: rows,
    rowGroupPanelShow: 'onlyWhenGrouping',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    groupDisplayType: 'groupRows' as any,
    rowDragManaged: false,
    // When new row is added
    onRowDataChanged: onRowDataUpdated,
    // When cell value is edited
    onCellValueChanged: onRowDataUpdated,
    singleClickEdit: true,
    context: { name },
  }

  return (
    <Stack spacing={1}>
      <DataTable {...dataTableProps} />
      {/* Fields */}
      {map(fields, ({ id }, index) => (
        <Fragment key={`${name}-${id}`}>
          <Controller
            name={`${name}.${index}.id`}
            control={control}
            defaultValue={id}
            render={({ field }) => <input hidden disabled {...field} />}
          />
        </Fragment>
      ))}
      <Stack spacing={2} direction="row" sx={{ alignSelf: 'align-start' }}>
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
          sx={{ alignSelf: 'flex-start' }}
        >
          Add Product
        </Button>
        {/* Only render remove button if there are rows available */}
        {size(rows) > 0 && (
          <Button
            startIcon={<RemoveIcon />}
            onClick={handleRemoveProduct}
            sx={{ alignSelf: 'flex-start' }}
          >
            Remove Product
          </Button>
        )}
      </Stack>
    </Stack>
  )
}

export default QuotationIronmongeryProductTable
