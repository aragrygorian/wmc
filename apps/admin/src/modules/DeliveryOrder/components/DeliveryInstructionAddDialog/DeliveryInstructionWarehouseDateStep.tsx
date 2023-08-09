import React, { forwardRef, useMemo } from 'react'
import { StepWizardChildProps } from 'react-step-wizard'
import { DataTable } from '@gravis-os/crud'
import { AgGridReact } from 'ag-grid-react'
import { ColDef } from 'ag-grid-community'
import dayjs from 'dayjs'
import { Typography } from '@gravis-os/ui'
import StatusCell from '@admin/components/StatusCell'
import { getColorFromStatusConfig } from '@admin/utils/getColorFromStatusConfig'
import { SALES_ORDER_STATUS_CONFIG } from '../../../SalesOrder/constants'
import TextEditor from '../../../../components/editors/TextEditor'
import DateEditor from '../../../../components/editors/DateEditor'
import { Reservation } from '../../../Reservation/types'
import { getInstock } from '../../../Inventory/utils/getInstock'

interface DeliveryInstructionWarehouseDateStepProps
  extends Partial<StepWizardChildProps> {
  reservations: Reservation[]
}

const DeliveryInstructionWarehouseDateStep = forwardRef<
  AgGridReact,
  DeliveryInstructionWarehouseDateStepProps
>((props, ref) => {
  const { reservations } = props

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        field: 'warehouse_product.warehouse.title',
        headerName: 'Warehouse',
      },
      {
        field: 'warehouse_product.product.title',
        headerName: 'Product',
      },
      {
        field: 'inventory',
        headerName: 'Available Inventory',
        valueGetter: ({ data }) =>
          getInstock(data.warehouse_product.inventory) - data.quantity,
      },
      {
        field: 'in',
        headerName: 'Qty to deliver',
        editable: true,
        cellRenderer: TextEditor,
        cellEditor: TextEditor,
        cellStyle: { padding: 0, height: '100%' },
      },
      {
        field: 'date',
        headerName: 'Pick Up Date',
        editable: true,
        maxWidth: 200,
        cellRenderer: DateEditor,
        cellEditor: DateEditor,
        cellEditorParams: {
          datePickerProps: { disablePast: true, minDate: dayjs() },
        },
        valueFormatter: ({ value }) => dayjs(value).format('DD MMM YYYY'),
        cellStyle: { padding: 0, height: '100%' },
      },
      {
        field: 'status',
        maxWidth: 150,
        cellRenderer: ({ value }) => (
          <StatusCell
            color={getColorFromStatusConfig(SALES_ORDER_STATUS_CONFIG)(value)}
            label={value}
          />
        ),
      },
      { field: 'actions', hide: true },
    ],
    [reservations]
  )

  return (
    <>
      <Typography color="primary" sx={{ fontWeight: 500 }}>
        YOU’RE CREATING THE PICK & PACK FOR THE FOLLOWING WAREHOUSES
      </Typography>
      <DataTable
        ref={ref}
        rowData={reservations.map((row) => ({
          ...row,
          date: dayjs(),
        }))}
        columnDefs={columnDefs}
        singleClickEdit
      />
    </>
  )
})

export default DeliveryInstructionWarehouseDateStep
