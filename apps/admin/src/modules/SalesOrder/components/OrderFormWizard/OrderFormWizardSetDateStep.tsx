import React, { forwardRef } from 'react'
import { StepWizardChildProps } from 'react-step-wizard'
import { DataTable } from '@gravis-os/crud'
import { SalesOrderLine } from '@prisma/client'
import { AgGridReact } from 'ag-grid-react'
import { first, get, groupBy } from 'lodash'
import dayjs from 'dayjs'
import { ColDef } from 'ag-grid-community'
import DateEditor from '../../../../components/editors/DateEditor'

const defaultDate = dayjs().add(2, 'week')

const columnDefs: ColDef[] = [
  { field: 'company.title', headerName: 'Supplier' },
  {
    field: 'date',
    headerName: 'Set Ready Date',
    editable: true,
    maxWidth: 200,
    cellRenderer: DateEditor,
    cellEditor: DateEditor,
    cellEditorParams: {
      datePickerProps: { disablePast: true, minDate: defaultDate.toDate() },
    },
    valueFormatter: ({ value }) => value && dayjs(value).format('DD MMM YYYY'),
    cellStyle: { padding: 0, height: '100%' },
  },
  { field: 'lines', hide: true },
  { field: 'actions', hide: true },
]

interface OrderFormWizardSetDateStepProps
  extends Partial<StepWizardChildProps> {
  items: SalesOrderLine[]
}

const OrderFormWizardSetDateStep = forwardRef<
  AgGridReact,
  OrderFormWizardSetDateStepProps
>((props, ref) => {
  const { items } = props
  const rowData = Object.values(groupBy(items, 'product.brand.company_id')).map(
    (rows) => ({
      company: get(first(rows), 'product.brand.company'),
      lines: rows,
      date: defaultDate,
    })
  )
  return (
    <DataTable
      ref={ref}
      rowData={rowData}
      columnDefs={columnDefs}
      rowHeight={56}
      singleClickEdit
    />
  )
})

export default OrderFormWizardSetDateStep
