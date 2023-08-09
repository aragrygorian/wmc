import React from 'react'
import { Card, StatStack } from '@gravis-os/ui'
import { curryRight, sumBy } from 'lodash'
import { useFetchSalesOrders } from '@admin/modules/SalesOrder/hooks/useFetchSalesOrder'
import { useFetchPurchaseOrders } from '@admin/modules/PurchaseOrder/hooks/useFetchPurchaseOrder'

interface HomeProcurementTabStatsProps {}

const sumByTotal: any = curryRight(sumBy)('total')

const getStatKey = (value: string) => `stats-${value}`

const getPurchaseOrderStatKey = (value: string) =>
  `${getStatKey('purchase-order')}-${value}`

const getSalesOrderStatKey = (value: string) =>
  `${getStatKey('sales-order')}-${value}`

const HomeProcurementTabStats: React.FC<HomeProcurementTabStatsProps> = () => {
  const { data: purchaseOrders = [] } = useFetchPurchaseOrders()
  const { data: salesOrders = [] } = useFetchSalesOrders()

  return (
    <Card>
      <StatStack
        reverse
        items={[
          {
            key: getSalesOrderStatKey('quantity'),
            title: salesOrders.length.toString(),
            overline: 'Sales Order Quantity',
          },
          {
            key: getSalesOrderStatKey('total'),
            title: sumByTotal(salesOrders),
            overline: 'Sales Order Total',
          },
          {
            key: getPurchaseOrderStatKey('quantity'),
            title: purchaseOrders.length.toString(),
            overline: 'Purchase Order Quantity',
          },
          {
            key: getPurchaseOrderStatKey('total'),
            title: sumByTotal(purchaseOrders),
            overline: 'Purchase Order Total',
          },
        ]}
      />
    </Card>
  )
}

export default HomeProcurementTabStats
