import { Box, Stack, Typography } from '@gravis-os/ui'
import React from 'react'
import HomeSalesTabQuotation from '@admin/modules/Home/components/tabs/sales/HomeSalesTabQuotation'
import HomeSalesTabInvoice from '@admin/modules/Home/components/tabs/sales/HomeSalesTabInvoice'
import HomeSalesTabStats from '@admin/modules/Home/components/tabs/sales/HomeSalesTabStats'
import HomeSalesTabChart from '@admin/modules/Home/components/tabs/sales/HomeSalesTabChart'

const HomeSalesTab = () => {
  return (
    <Box p={3}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3">Overview</Typography>
          <Typography variant="body1" color="text.secondary">
            View your progress
          </Typography>
        </Box>

        <HomeSalesTabStats />
        <HomeSalesTabChart />
        <HomeSalesTabQuotation />
        <HomeSalesTabInvoice />
      </Stack>
    </Box>
  )
}

export default HomeSalesTab
