import { BackButton, ListCard, ListCardItemProps, Stack } from '@gravis-os/ui'
import MoneyIcon from '@mui/icons-material/Money'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'
import { routes } from '@warehouse/app/routes'
import DashboardLayout from '@warehouse/layouts/DashboardLayout'
import { NextPage } from 'next'
import React from 'react'

const receiveListCardItems: ListCardItemProps[] = [
  {
    key: 'purchase-order-receive-list-card',
    title: 'Purchase Order',
    icon: <MoneyIcon />,
    href: routes.PURCHASE_ORDER,
  },
  {
    key: 'loan-form-receive-list-card',
    title: 'Loan Form',
    icon: <PaidOutlinedIcon />,
  },
]

const ReceivePage: NextPage = () => {
  return (
    <DashboardLayout>
      <Stack spacing={2} p={2}>
        <BackButton
          title="Receive"
          href={routes.HOME}
          sx={{ left: 0, mr: 'auto' }}
        />
        <ListCard items={receiveListCardItems} />
      </Stack>
    </DashboardLayout>
  )
}

export default ReceivePage
