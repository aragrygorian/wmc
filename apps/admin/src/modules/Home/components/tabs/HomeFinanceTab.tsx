import { Box, Card, Chip, Stack, StatStack, Typography } from '@gravis-os/ui'
import React from 'react'
import { HomeChartCard } from '../HomeChartCard'
import HomeSectionHeader from '../HomeSectionHeader'

const HomeFinanceTab = () => {
  return (
    <Box p={3}>
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Typography variant="h3">Overview</Typography>
          <Typography variant="body1" color="text.secondary">
            View finance progress
          </Typography>
        </Box>

        {/* StatStack */}
        <Card>
          <StatStack
            reverse
            items={[
              {
                key: 'sales_total',
                title: '$11,837.15',
                overline: 'Sales Total',
                titleTypographyProps: { sx: { color: 'success.main' } },
              },
              {
                key: 'quotation_quantity',
                title: '40',
                overline: 'Quotation Quantity',
              },
              {
                key: 'quotation_total',
                title: '$8,837.15',
                overline: 'Quotation Total',
              },
              {
                key: 'invoice_quantity',
                title: '50',
                overline: 'Invoice Quantity',
              },
              {
                key: 'invoice_total',
                title: '$7,837.15',
                overline: 'Invoice Total',
              },
            ]}
          />
        </Card>

        {/* TotalQuotationsChartCard */}
        <HomeChartCard
          title="Total Quotations"
          subtitle="Value of quotations raised"
          actions={
            <Box>
              <Stack direction="row" alignItems="flex-end" spacing={1}>
                <div>
                  <Chip
                    size="small"
                    color="success"
                    title="+$621.26 (8.21%)"
                    sx={{ mb: 0.5 }}
                  />
                </div>
                <div>
                  <Typography variant="overline" color="text.secondary">
                    Total Value
                  </Typography>
                  <Typography variant="h3">$100,200</Typography>
                </div>
              </Stack>
            </Box>
          }
        />
        <HomeSectionHeader title="Quotations" />

        {/* StatStack */}
        <Card>
          <StatStack
            reverse
            items={[
              { key: 'quotation_total', title: '20', overline: 'Pending' },
              {
                key: 'invoice_quantity',
                title: '15',
                overline: 'Pending Approval',
              },
              { key: 'invoice_total', title: '10', overline: 'Accepted' },
            ]}
          />
        </Card>

        {/* Header */}
        <HomeSectionHeader title="Invoice" />

        {/* StatStack */}
        <Card>
          <StatStack
            reverse
            items={[
              { key: 'quotation_total', title: '20', overline: 'Pending' },
              {
                key: 'sales_total',
                title: '15',
                overline: 'Overdue',
                titleTypographyProps: { sx: { color: 'error.main' } },
              },
              {
                key: 'sales_total',
                title: '3',
                overline: 'Unpaid',
                titleTypographyProps: { sx: { color: 'error.main' } },
              },
              { key: 'invoice_quantity', title: '40', overline: 'Paid' },
              { key: 'invoice_total', title: '12', overline: 'Void' },
            ]}
          />
        </Card>
      </Stack>
    </Box>
  )
}

export default HomeFinanceTab
