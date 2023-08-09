import useUser from '@admin/app/useUser'
import { Box, Card, Stack, StatStack } from '@gravis-os/ui'
import HomeSectionHeader from '@admin/modules/Home/components/HomeSectionHeader'
import React from 'react'
import {
  ORDER_FORM_STATUS_COMPLETED,
  ORDER_FORM_STATUS_PENDING_PURCHASE_ORDER,
  ORDER_FORM_STATUS_PENDING_STOCK_ARRIVAL,
  ORDER_FORM_STATUS_VOID,
} from '@admin/modules/OrderForm/constants'
import HomeStatLink from '@admin/modules/Home/components/HomeStatLink'
import SendIcon from '@mui/icons-material/SendOutlined'
import { useFetchPurchaseOrderCount } from '@admin/modules/PurchaseOrder/hooks/useFetchPurchaseOrder'
import {
  PURCHASE_ORDER_STATUS_COMPLETED,
  PURCHASE_ORDER_STATUS_ETA_OVERDUE,
  PURCHASE_ORDER_STATUS_PAID,
  PURCHASE_ORDER_STATUS_PENDING_PAYMENT,
  PURCHASE_ORDER_STATUS_PENDING_STOCK_ARRIVAL,
} from '@admin/modules/PurchaseOrder/constants'
import purchaseOrderModule from '@admin/modules/PurchaseOrder/purchaseOrderModule'
import { getDocumentItemStatusKey } from '@admin/modules/Home/utils/getDocumentItemStatusKey'

const getStatusKey = getDocumentItemStatusKey(purchaseOrderModule.name.singular)

const useFetchPurchaseOrderStatusCount = (status: string) => {
  const { dbUser } = useUser()
  return useFetchPurchaseOrderCount({
    select: '*',
    match: { status, assignee_id: dbUser?.id },
  })
}

const HomeProcurementTabPurchaseOrder = () => {
  const { data: pendingPaymentCount = 0 } = useFetchPurchaseOrderStatusCount(
    PURCHASE_ORDER_STATUS_PENDING_PAYMENT
  )

  const { data: paidCount = 0 } = useFetchPurchaseOrderStatusCount(
    PURCHASE_ORDER_STATUS_PAID
  )

  const { data: pendingStockArrivalCount = 0 } =
    useFetchPurchaseOrderStatusCount(
      PURCHASE_ORDER_STATUS_PENDING_STOCK_ARRIVAL
    )

  const { data: completedCount = 0 } = useFetchPurchaseOrderStatusCount(
    PURCHASE_ORDER_STATUS_COMPLETED
  )

  const { data: etaOverdueCount = 0 } = useFetchPurchaseOrderStatusCount(
    PURCHASE_ORDER_STATUS_ETA_OVERDUE
  )

  return (
    <>
      <HomeSectionHeader title="Purchase Order" />

      <Stack spacing={2}>
        <Card>
          <StatStack
            reverse
            items={[
              {
                key: getStatusKey(ORDER_FORM_STATUS_PENDING_PURCHASE_ORDER),
                title: pendingPaymentCount.toString(),
                overline: ORDER_FORM_STATUS_PENDING_PURCHASE_ORDER,
              },
              {
                key: getStatusKey(ORDER_FORM_STATUS_PENDING_STOCK_ARRIVAL),
                title: paidCount.toString(),
                overline: ORDER_FORM_STATUS_PENDING_STOCK_ARRIVAL,
              },
              {
                key: getStatusKey(ORDER_FORM_STATUS_COMPLETED),
                title: pendingStockArrivalCount.toString(),
                overline: ORDER_FORM_STATUS_COMPLETED,
              },
              {
                key: getStatusKey(ORDER_FORM_STATUS_VOID),
                title: completedCount.toString(),
                overline: ORDER_FORM_STATUS_VOID,
              },
              {
                key: getStatusKey(ORDER_FORM_STATUS_VOID),
                title: etaOverdueCount.toString(),
                overline: ORDER_FORM_STATUS_VOID,
              },
            ]}
          />
        </Card>
      </Stack>

      <Box>
        {[
          {
            title: `${pendingPaymentCount} purchase orders pending payment`,
            status: PURCHASE_ORDER_STATUS_PENDING_PAYMENT,
            show: Boolean(pendingPaymentCount),
          },
          {
            title: `${pendingStockArrivalCount} purchase orders pending stock arrival`,
            status: PURCHASE_ORDER_STATUS_PENDING_STOCK_ARRIVAL,
            show: Boolean(pendingStockArrivalCount),
          },
        ].map(
          ({ show, status, title }) =>
            show && (
              <HomeStatLink
                href={`${purchaseOrderModule.route.plural}?status=${status}`}
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

export default HomeProcurementTabPurchaseOrder
