import { Box, Card, Stack, StatStack } from '@gravis-os/ui'
import React from 'react'
import SendIcon from '@mui/icons-material/SendOutlined'
import { useFetchInvoiceCount } from '@admin/modules/Invoice/hooks/useFetchInvoices'
import {
  INVOICE_STATUS_OVERDUE,
  INVOICE_STATUS_PAID,
  INVOICE_STATUS_PENDING,
  INVOICE_STATUS_UNPAID,
  INVOICE_STATUS_VOID,
} from '@admin/modules/Invoice/constants'
import invoiceModule from '@admin/modules/Invoice/invoiceModule'
import useUser from '@admin/app/useUser'
import { getDocumentItemStatusKey } from '@admin/modules/Home/utils/getDocumentItemStatusKey'
import HomeStatLink from '../../HomeStatLink'
import HomeSectionHeader from '../../HomeSectionHeader'

const getStatusKey = getDocumentItemStatusKey(invoiceModule.name.singular)

const useFetchInvoiceStatusCount = (status: string) => {
  const { dbUser } = useUser()

  return useFetchInvoiceCount({
    select: '*',
    match: { status, assignee_id: dbUser?.id },
  })
}
const HomeSalesTabInvoice = () => {
  const { data: pendingCount = 0 } = useFetchInvoiceStatusCount(
    INVOICE_STATUS_PENDING
  )

  const { data: overdueCount = 0 } = useFetchInvoiceStatusCount(
    INVOICE_STATUS_OVERDUE
  )

  const { data: unpaidCount = 0 } = useFetchInvoiceStatusCount(
    INVOICE_STATUS_UNPAID
  )

  const { data: paidCount = 0 } =
    useFetchInvoiceStatusCount(INVOICE_STATUS_PAID)

  const { data: voidCount = 0 } =
    useFetchInvoiceStatusCount(INVOICE_STATUS_VOID)

  return (
    <>
      <HomeSectionHeader title="Invoice" />

      <Stack spacing={2}>
        <Card>
          <StatStack
            reverse
            items={[
              {
                key: getStatusKey(INVOICE_STATUS_PENDING),
                title: pendingCount.toString(),
                overline: INVOICE_STATUS_PENDING,
              },
              {
                key: getStatusKey(INVOICE_STATUS_OVERDUE),
                title: overdueCount.toString(),
                overline: INVOICE_STATUS_OVERDUE,
                titleTypographyProps: { sx: { color: 'error.main' } },
              },
              {
                key: getStatusKey(INVOICE_STATUS_UNPAID),
                title: unpaidCount.toString(),
                overline: INVOICE_STATUS_UNPAID,
                titleTypographyProps: { sx: { color: 'error.main' } },
              },
              {
                key: getStatusKey(INVOICE_STATUS_PAID),
                title: paidCount.toString(),
                overline: INVOICE_STATUS_PAID,
              },
              {
                key: getStatusKey(INVOICE_STATUS_VOID),
                title: voidCount.toString(),
                overline: INVOICE_STATUS_VOID,
              },
            ]}
          />
        </Card>

        <Box>
          {[
            {
              title: `[Reminder] ${pendingCount} invoices to be sent`,
              status: INVOICE_STATUS_PENDING,
              show: Boolean(pendingCount),
            },
            {
              title: `${overdueCount} invoices pending approval`,
              status: INVOICE_STATUS_OVERDUE,
              show: Boolean(overdueCount),
            },
          ].map(
            ({ show, status, title }) =>
              show && (
                <HomeStatLink
                  href={`${invoiceModule.route.plural}?status=${status}`}
                  startIcon={
                    <SendIcon fontSize="small" sx={{ color: 'grey.500' }} />
                  }
                  key={`${getStatusKey(status)}-link`}
                >
                  {title}
                </HomeStatLink>
              )
          )}
        </Box>
      </Stack>
    </>
  )
}

export default HomeSalesTabInvoice
