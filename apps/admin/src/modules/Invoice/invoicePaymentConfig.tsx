import { printAmount } from '@gravis-os/utils'
import dayjs from 'dayjs'

export const invoicePaymentModule = {
  sk: 'slug',
  table: {
    name: 'invoice_payment',
  },
  name: {
    singular: 'Invoice Payment',
    plural: 'Invoice Payments',
  },
  select: {
    list: '*, invoice!inner(*)',
  },
}

export const invoicePaymentColumnDefs = [
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
