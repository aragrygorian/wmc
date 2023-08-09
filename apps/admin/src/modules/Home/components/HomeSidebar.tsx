import React from 'react'
import { Box, Card, Grid, List, Stack, Typography } from '@gravis-os/ui'
import { StorageAvatar } from '@gravis-os/storage'
import {
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  ChevronRightOutlined as ChevronRightOutlinedIcon,
  ReceiptOutlined as ReceiptOutlinedIcon,
} from '@mui/icons-material'
import { useUser } from '@gravis-os/auth'
import { useRouter } from 'next/router'
import { useFetchQuotationCount } from '@admin/modules/Quotation/hooks/useFetchQuotations'
import { QUOTATION_STATUS_PENDING_APPROVAL } from '@admin/modules/Quotation/constants'
import { INVOICE_STATUS_OVERDUE } from '@admin/modules/Invoice/constants'
import { useFetchInvoiceCount } from '@admin/modules/Invoice/hooks/useFetchInvoices'
import invoiceModule from '@admin/modules/Invoice/invoiceModule'
import { getDocumentItemStatusKey } from '@admin/modules/Home/utils/getDocumentItemStatusKey'
import { quotationModule } from '@admin/modules/Quotation/quotationModule'

const getStatusKey = getDocumentItemStatusKey('side-bar')

const HomeSidebar = () => {
  const router = useRouter()
  const { user } = useUser()

  const { data: pendingApprovalQuotationsCount } = useFetchQuotationCount({
    select: '*',
    match: { status: QUOTATION_STATUS_PENDING_APPROVAL },
  })

  const { data: overdueInvoiceCount } = useFetchInvoiceCount({
    select: '*',
    match: { status: INVOICE_STATUS_OVERDUE },
  })

  return (
    <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
      <Card disablePadding sx={{ minHeight: '100vh', height: '100%' }}>
        <Stack spacing={4}>
          {/* Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, px: 3 }}>
            <StorageAvatar
              src={user?.avatar_src}
              alt={user?.avatar_alt || user?.title}
              size={60}
              variant="rounded"
            />
            <Box sx={{ ml: 1.5 }}>
              <Typography variant="h4">
                {user?.full_name || user?.email}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                {user?.role?.title}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Box sx={{ mb: 1, px: 3 }}>
              <Typography variant="h4">Today's Watchlist</Typography>
            </Box>

            <List
              dense
              items={[
                {
                  key: getStatusKey(QUOTATION_STATUS_PENDING_APPROVAL),
                  title: `${pendingApprovalQuotationsCount} Quotations Pending Approval`,
                  url: `${quotationModule.route.plural}?status=${QUOTATION_STATUS_PENDING_APPROVAL}`,
                  show: Boolean(pendingApprovalQuotationsCount),
                },
                {
                  key: getStatusKey(INVOICE_STATUS_OVERDUE),
                  title: `${overdueInvoiceCount} Invoices Overdue`,
                  url: `${invoiceModule.route.plural}?status=${INVOICE_STATUS_OVERDUE}`,
                  show: Boolean(overdueInvoiceCount),
                },
              ]
                .filter(({ show }) => show)
                .map(({ url, ...item }) => ({
                  ...item,
                  disableGutters: true,
                  startIcon: <ReceiptOutlinedIcon color="primary" />,
                  endIcon: <ChevronRightOutlinedIcon color="primary" />,
                  onClick: () => router.push(url),
                  buttonProps: { sx: { px: 3 } },
                }))}
            />
          </Box>
        </Stack>
      </Card>
    </Grid>
  )
}

export default HomeSidebar
