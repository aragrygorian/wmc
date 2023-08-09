import useUser from '@admin/app/useUser'
import { Box, Card, Stack, StatStack } from '@gravis-os/ui'
import HomeSectionHeader from '@admin/modules/Home/components/HomeSectionHeader'
import React from 'react'
import HomeStatLink from '@admin/modules/Home/components/HomeStatLink'
import SendIcon from '@mui/icons-material/SendOutlined'
import { PURCHASE_ORDER_STATUS_PENDING_PAYMENT } from '@admin/modules/PurchaseOrder/constants'
import { getDocumentItemStatusKey } from '@admin/modules/Home/utils/getDocumentItemStatusKey'
import { deliveryOrderModule } from '@admin/modules/DeliveryOrder'
import {
  DELIVERY_ORDER_STATUS_DELIVERED,
  DELIVERY_ORDER_STATUS_PENDING_DELIVERY,
} from '@admin/modules/DeliveryOrder/constants'
import { useFetchDeliveryOrderCount } from '@admin/modules/DeliveryOrder/hooks/useFetchDeliveryOrder'

const getStatusKey = getDocumentItemStatusKey(deliveryOrderModule.name.singular)

const useFetchDeliveryOrderStatusCount = (status: string) => {
  const { dbUser } = useUser()

  return useFetchDeliveryOrderCount({
    select: '*',
    match: { status, assignee_id: dbUser?.id },
  })
}

const HomeProcurementTabDeliveryOrder = () => {
  const { data: pendingPaymentCount = 0 } = useFetchDeliveryOrderStatusCount(
    DELIVERY_ORDER_STATUS_PENDING_DELIVERY
  )

  const { data: paidCount = 0 } = useFetchDeliveryOrderStatusCount(
    DELIVERY_ORDER_STATUS_DELIVERED
  )

  return (
    <>
      <HomeSectionHeader title="Delivery Order" />

      <Stack spacing={2}>
        <Card>
          <StatStack
            reverse
            items={[
              {
                key: getStatusKey(DELIVERY_ORDER_STATUS_PENDING_DELIVERY),
                title: pendingPaymentCount.toString(),
                overline: DELIVERY_ORDER_STATUS_PENDING_DELIVERY,
              },
              {
                key: getStatusKey(DELIVERY_ORDER_STATUS_DELIVERED),
                title: paidCount.toString(),
                overline: DELIVERY_ORDER_STATUS_DELIVERED,
              },
            ]}
          />
        </Card>
      </Stack>

      <Box>
        {[
          {
            title: `${pendingPaymentCount} delivery orders pending delivery`,
            status: DELIVERY_ORDER_STATUS_PENDING_DELIVERY,
            show: Boolean(pendingPaymentCount),
          },
        ].map(
          ({ show, status, title }) =>
            show && (
              <HomeStatLink
                href={`${deliveryOrderModule.route.plural}?status=${status}`}
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
    </>
  )
}

export default HomeProcurementTabDeliveryOrder
