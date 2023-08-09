import React, { useMemo, useState } from 'react'
import { useWatch } from 'react-hook-form'
import { Button, Card, Stack } from '@gravis-os/ui'
import { DataTable, DataTableProps } from '@gravis-os/crud'
import ControlledTextEditor from '../../../components/editors/ControlledTextEditor'
import { getEditableColumnTypes } from '../../../utils/getEditableColumnTypes'

const DeliveryInstructionFieldArray = (props) => {
  const { formContext, isReadOnly, item } = props
  const { control } = formContext

  const [sortable, setSortable] = useState(true)

  const name = 'lines'
  const watchedRows = useWatch({ name, control })
  const defaultRow = {
    quotation_id: item?.id,
    quantity: 1,
  }

  const rows = watchedRows?.length ? watchedRows : [defaultRow]

  // Formulas
  const columnDefs = useMemo(() => {
    return [
      {
        rowDrag: sortable,
        maxWidth: 30,
        suppressMenu: true,
      },
      {
        maxWidth: 125,
        field: 'product.model_code',
        headerName: 'Model Code',
      },
      {
        minWidth: 350,
        field: 'product.title',
        headerName: 'Product Name',
      },
      {
        field: 'quantity',
        headerName: 'Qty to Deliver',
        minWidth: 150,
      },
      {
        type: 'editableTextColumn',
        field: 'note',
        enableRowGroup: true,
        cellRendererParams: { name: 'note' },
        cellEditorParams: { name: 'note' },
      },
      { field: 'actions', hide: true },
    ].map((columnDef) => ({ ...columnDef }))
  }, [rows, sortable])

  const dataTableProps: DataTableProps = {
    actions: (
      <>
        <Button size="small" variant="outlined">
          Search Pick & Pack
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
    </Card>
  )
}

export default DeliveryInstructionFieldArray
