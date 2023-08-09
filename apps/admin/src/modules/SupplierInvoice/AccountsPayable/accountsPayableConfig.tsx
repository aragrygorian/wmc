import ModuleLink from '@admin/components/ModuleLink'
import React from 'react'
import { supplierInvoiceModule } from '@admin/modules/SupplierInvoice/supplierInvoiceConfig'
import { printAmount } from '@gravis-os/utils'
import dayjs from 'dayjs'
import StatusCell from '@admin/components/StatusCell'
import { getColorFromStatusConfig } from '@admin/utils/getColorFromStatusConfig'
import { SUPPLIER_INVOICE_STATUS_CONFIG } from '@admin/modules/SupplierInvoice/constants'

export const accountsPayableColumnDefs = [
  {
    field: 'id',
    headerName: 'SI ID',
    module: supplierInvoiceModule,
    cellRenderer: ({ data }) => (
      <ModuleLink module={supplierInvoiceModule} item={data} />
    ),
  },
  {
    field: 'total',
    headerName: 'Amount Due',
    valueFormatter: ({ value }) => printAmount(value),
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
        color={getColorFromStatusConfig(SUPPLIER_INVOICE_STATUS_CONFIG)(value)}
        label={value}
      />
    ),
  },
]
