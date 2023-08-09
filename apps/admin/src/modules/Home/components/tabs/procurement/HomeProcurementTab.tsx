import { Box, Stack, Typography } from '@gravis-os/ui'
import React from 'react'
import HomeProcurementTabSalesOrder from '@admin/modules/Home/components/tabs/procurement/HomeProcurementTabSalesOrder'
import HomeProcurementTabOrderForm from '@admin/modules/Home/components/tabs/procurement/HomeProcurementTabOrderForm'
import HomeProcurementTabPurchaseOrder from '@admin/modules/Home/components/tabs/procurement/HomeProcurementTabPurchaseOrder'
import HomeProcurementTabDeliveryOrder from '@admin/modules/Home/components/tabs/procurement/HomeProcurementTabDeliveryOrder'
import HomeProcurementTabDeliveryInstruction from '@admin/modules/Home/components/tabs/procurement/HomeProcurementTabDeliveryInstruction'
import HomeProcurementTabSalesOrderChart from '@admin/modules/Home/components/tabs/procurement/HomeProcurementTabSalesOrderChart'
import HomeProcurementTabPurchaseOrderChart from '@admin/modules/Home/components/tabs/procurement/HomeProcurementTabPurchaseOrderChart'
import HomeProcurementTabStats from '@admin/modules/Home/components/tabs/procurement/HomeProcurementTabStats'

const HomeProcurementTab = () => {
  return (
    <Box p={3}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3">Overview</Typography>
          <Typography variant="body1" color="text.secondary">
            View your progress
          </Typography>
        </Box>

        <HomeProcurementTabStats />

        <Stack sx={{ flexDirection: 'row', gap: 2 }}>
          <HomeProcurementTabSalesOrderChart sx={{ flexBasis: '50%' }} />
          <HomeProcurementTabPurchaseOrderChart sx={{ flexBasis: '50%' }} />
        </Stack>

        <HomeProcurementTabSalesOrder />
        <HomeProcurementTabOrderForm />
        <HomeProcurementTabPurchaseOrder />
        <HomeProcurementTabDeliveryOrder />
        <HomeProcurementTabDeliveryInstruction />
      </Stack>
    </Box>
  )
}

export default HomeProcurementTab
