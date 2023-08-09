import useUser from '@admin/app/useUser'
import { useFetchSalesOrderCount } from '@admin/modules/SalesOrder/hooks/useFetchSalesOrder'
import {
  SALES_ORDER_STATUS_COMPLETED,
  SALES_ORDER_STATUS_ONGOING,
  SALES_ORDER_STATUS_PENDING_DELIVERY,
  SALES_ORDER_STATUS_VOID,
} from '@admin/modules/SalesOrder/constants'
import { Card, Stack, StatStack } from '@gravis-os/ui'
import HomeSectionHeader from '@admin/modules/Home/components/HomeSectionHeader'
import React from 'react'
import { getDocumentItemStatusKey } from '@admin/modules/Home/utils/getDocumentItemStatusKey'
import { salesOrderModule } from '@admin/modules/SalesOrder/salesOrderConfig'

const getStatusKey = getDocumentItemStatusKey(salesOrderModule.name.singular)

const useFetchSalesOrderStatusCount = (status: string) => {
  const { dbUser } = useUser()

  return useFetchSalesOrderCount({
    select: '*',
    match: { status, assignee_id: dbUser?.id },
  })
}

const HomeProcurementTabSalesOrder = () => {
  const { data: ongoingCount = 0 } = useFetchSalesOrderStatusCount(
    SALES_ORDER_STATUS_ONGOING
  )

  const { data: pendingDeliveryCount = 0 } = useFetchSalesOrderStatusCount(
    SALES_ORDER_STATUS_PENDING_DELIVERY
  )

  const { data: completedCount = 0 } = useFetchSalesOrderStatusCount(
    SALES_ORDER_STATUS_COMPLETED
  )

  const { data: voidCount = 0 } = useFetchSalesOrderStatusCount(
    SALES_ORDER_STATUS_VOID
  )

  return (
    <>
      <HomeSectionHeader title="Sales Order" />

      <Stack spacing={2}>
        <Card>
          <StatStack
            reverse
            items={[
              {
                key: getStatusKey(SALES_ORDER_STATUS_ONGOING),
                title: ongoingCount.toString(),
                overline: SALES_ORDER_STATUS_ONGOING,
              },
              {
                key: getStatusKey(SALES_ORDER_STATUS_PENDING_DELIVERY),
                title: pendingDeliveryCount.toString(),
                overline: SALES_ORDER_STATUS_PENDING_DELIVERY,
              },
              {
                key: getStatusKey(SALES_ORDER_STATUS_COMPLETED),
                title: completedCount.toString(),
                overline: SALES_ORDER_STATUS_COMPLETED,
              },
              {
                key: getStatusKey(SALES_ORDER_STATUS_VOID),
                title: voidCount.toString(),
                overline: SALES_ORDER_STATUS_VOID,
              },
            ]}
          />
        </Card>
      </Stack>
    </>
  )
}

export default HomeProcurementTabSalesOrder
