import { printAmount } from '@gravis-os/utils'
import dayjs from 'dayjs'

export const supplierInvoicePaymentModule = {
  sk: 'slug',
  table: {
    name: 'supplier_invoice_payment',
  },
  name: {
    singular: 'Supplier Invoice Payment',
    plural: 'Supplier Invoice Payments',
  },
  select: {
    list: '*, supplier_invoice!inner(*)',
  },
}

export const supplierInvoicePaymentColumnDefs = [
  {
    field: 'type',
    headerName: 'Payment Mode',
  },
  {
    field: 'paid_at',
    headerName: 'Date',
    valueFormatter: ({ value }) => value && dayjs(value).format('DD MMM YYYY'),
  },
  {
    field: 'currency',
  },
  {
    field: 'rate',
    valueGetter: () => 1,
  },
  {
    field: 'amount',
    valueFormatter: ({ value }) => printAmount(value),
  },
  {
    field: 'note',
    headerName: 'Remarks',
  },
]
