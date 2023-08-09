import ModuleLink from '@admin/components/ModuleLink'
import React from 'react'
import { printAmount } from '@gravis-os/utils'
import dayjs from 'dayjs'
import StatusCell from '@admin/components/StatusCell'
import { getColorFromStatusConfig } from '@admin/utils/getColorFromStatusConfig'
import invoiceModule from '@admin/modules/Invoice/invoiceModule'
import { INVOICE_STATUS_CONFIG } from '@admin/modules/Invoice/constants'
import AgingCounter from '@admin/components/AgingCounter'

export const accountsReceivableColumnDefs = [
  {
    field: 'id',
    headerName: 'INV ID',
    module: invoiceModule,
    cellRenderer: ({ data }) => (
      <ModuleLink module={invoiceModule} item={data} />
    ),
  },
  {
    field: 'total',
    headerName: 'Amount Due',
    valueFormatter: ({ value }) => printAmount(value),
  },
  {
    field: 'created_at',
    headerName: 'Aging',
    cellRenderer: AgingCounter,
    maxWidth: 100,
  },
  {
    field: 'due_at',
    headerName: 'Due At',
    maxWidth: 150,
    valueFormatter: ({ value }) =>
      value ? dayjs(value).format('DD MMM YYYY') : '',
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    maxWidth: 150,
    valueFormatter: ({ value }) =>
      value ? dayjs(value).format('DD MMM YYYY') : '',
  },
  {
    field: 'status',
    pinned: 'right',
    minWidth: 100,
    maxWidth: 150,
    cellRenderer: ({ value }) => (
      <StatusCell
        color={getColorFromStatusConfig(INVOICE_STATUS_CONFIG)(value)}
        label={value}
      />
    ),
  },
]
