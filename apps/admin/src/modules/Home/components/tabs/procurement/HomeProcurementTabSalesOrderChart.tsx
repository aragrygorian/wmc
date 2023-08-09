import React from 'react'
import { extend, get, groupBy, keyBy, keys, mapValues, values } from 'lodash'
import { useTheme } from '@mui/system'
import { Box, Card, CardProps, Stack, Typography } from '@gravis-os/ui'
import { useFetchSalesOrders } from '@admin/modules/SalesOrder/hooks/useFetchSalesOrder'
import { SALES_ORDER_STATUS_CONFIG } from '@admin/modules/SalesOrder/constants'
import map from 'lodash/map'
import HomeProcurementTabDonutChart from '@admin/modules/Home/components/tabs/procurement/HomeProcurementTabDonutChart'

interface HomeProcurementTabSalesOrderChartProps extends CardProps {}

const HomeProcurementTabSalesOrderChart: React.FC<
  HomeProcurementTabSalesOrderChartProps
> = (props) => {
  const theme = useTheme()

  const { data = [] } = useFetchSalesOrders()

  const salesOrdersByStatus = extend(
    mapValues(keyBy(SALES_ORDER_STATUS_CONFIG, 'value'), () => []),
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
          <Typography variant="h4">Sales Order</Typography>
          <Typography variant="body1" color="text.secondary">
            Breakdown of Sales Order Status
          </Typography>
        </Box>
      </Stack>

      <HomeProcurementTabDonutChart
        colors={map(SALES_ORDER_STATUS_CONFIG, ({ color }) =>
          get(theme.palette, color)
        )}
        labels={keys(salesOrdersByStatus)}
        series={map(values(salesOrdersByStatus), 'length')}
      />
    </Card>
  )
}

export default HomeProcurementTabSalesOrderChart
