import React from 'react'
import { DataTable } from '@gravis-os/crud'
import { printAmount } from '@gravis-os/utils'
import dayjs from 'dayjs'
import { Box } from '@mui/material'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import DialogButton from './DialogButton'

interface Payment {
  type: string
  paid_at: Date
  currency: string
  amount: number
  rate?: number | null
  note?: string | null
}

const columnDefs = [
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

interface PaymentHistoryDialogProps {
  payments: Payment[] | null
}

const PaymentHistoryDialog: React.FC<PaymentHistoryDialogProps> = (props) => {
  const { payments } = props
  return (
    <DialogButton
      title="Payment History"
      buttonProps={{
        startIcon: <AttachMoneyOutlinedIcon />,
        color: 'inherit',
        children: 'Payment',
      }}
      disableActions
    >
      <Box sx={{ mt: -2.5 }}>
        <DataTable rowData={payments} columnDefs={columnDefs} />
      </Box>
    </DialogButton>
  )
}

export default PaymentHistoryDialog
