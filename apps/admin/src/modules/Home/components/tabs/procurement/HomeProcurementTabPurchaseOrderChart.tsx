import React from 'react'
import { extend, get, groupBy, keyBy, keys, mapValues, values } from 'lodash'
import { useTheme } from '@mui/system'
import { Box, Card, CardProps, Stack, Typography } from '@gravis-os/ui'
import map from 'lodash/map'
import HomeProcurementTabDonutChart from '@admin/modules/Home/components/tabs/procurement/HomeProcurementTabDonutChart'
import { useFetchPurchaseOrders } from '@admin/modules/PurchaseOrder/hooks/useFetchPurchaseOrder'
import { PURCHASE_ORDER_STATUS_CONFIG } from '@admin/modules/PurchaseOrder/constants'

interface HomeProcurementTabPurchaseOrderChartProps extends CardProps {}

const HomeProcurementTabPurchaseOrderChart: React.FC<
  HomeProcurementTabPurchaseOrderChartProps
> = (props) => {
  const theme = useTheme()

  const { data = [] } = useFetchPurchaseOrders()

  const purchaseOrdersByStatus = extend(
    mapValues(keyBy(PURCHASE_ORDER_STATUS_CONFIG, 'value'), () => []),
    groupBy(data, 'status')
  )

  return (
    <Card {...props}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Box>
          <Typography variant="h4">Purchase Order</Typography>
          <Typography variant="body1" color="text.secondary">
            Breakdown of Purchase Order Status
          </Typography>
        </Box>
      </Stack>

      <HomeProcurementTabDonutChart
        colors={map(PURCHASE_ORDER_STATUS_CONFIG, ({ color }) =>
          get(theme.palette, color)
        )}
        labels={keys(purchaseOrdersByStatus)}
        series={map(values(purchaseOrdersByStatus), 'length')}
      />
    </Card>
  )
}

export default HomeProcurementTabPurchaseOrderChart
