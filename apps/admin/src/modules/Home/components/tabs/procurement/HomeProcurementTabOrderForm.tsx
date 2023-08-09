import useUser from '@admin/app/useUser'
import { Box, Card, Stack, StatStack } from '@gravis-os/ui'
import HomeSectionHeader from '@admin/modules/Home/components/HomeSectionHeader'
import React from 'react'
import { useFetchOrderFormCount } from '@admin/modules/OrderForm/hooks/useFetchOrderForm'
import {
  ORDER_FORM_STATUS_COMPLETED,
  ORDER_FORM_STATUS_OVERDUE,
  ORDER_FORM_STATUS_PENDING_PURCHASE_ORDER,
  ORDER_FORM_STATUS_PENDING_STOCK_ARRIVAL,
  ORDER_FORM_STATUS_VOID,
} from '@admin/modules/OrderForm/constants'
import HomeStatLink from '@admin/modules/Home/components/HomeStatLink'
import SendIcon from '@mui/icons-material/SendOutlined'
import { orderFormModule } from '@admin/modules/OrderForm/orderFormConfig'
import { getDocumentItemStatusKey } from '@admin/modules/Home/utils/getDocumentItemStatusKey'

const getStatusKey = getDocumentItemStatusKey(orderFormModule.name.singular)

const useFetchOrderFormStatusCount = (status: string) => {
  const { dbUser } = useUser()
  return useFetchOrderFormCount({
    select: '*',
    match: { status, assignee_id: dbUser?.id },
  })
}

const HomeProcurementTabOrderForm = () => {
  const { data: pendingPurchaseOrderCount = 0 } = useFetchOrderFormStatusCount(
    ORDER_FORM_STATUS_PENDING_PURCHASE_ORDER
  )

  const { data: pendingStockArrivalCount = 0 } = useFetchOrderFormStatusCount(
    ORDER_FORM_STATUS_PENDING_STOCK_ARRIVAL
  )

  const { data: completedCount = 0 } = useFetchOrderFormStatusCount(
    ORDER_FORM_STATUS_COMPLETED
  )

  const { data: voidCount = 0 } = useFetchOrderFormStatusCount(
    ORDER_FORM_STATUS_OVERDUE
  )

  return (
    <>
      <HomeSectionHeader title="Order Form" />

      <Stack spacing={2}>
        <Card>
          <StatStack
            reverse
            items={[
              {
                key: getStatusKey(ORDER_FORM_STATUS_PENDING_PURCHASE_ORDER),
                title: pendingPurchaseOrderCount.toString(),
                overline: ORDER_FORM_STATUS_PENDING_PURCHASE_ORDER,
              },
              {
                key: getStatusKey(ORDER_FORM_STATUS_PENDING_STOCK_ARRIVAL),
                title: pendingStockArrivalCount.toString(),
                overline: ORDER_FORM_STATUS_PENDING_STOCK_ARRIVAL,
              },
              {
                key: getStatusKey(ORDER_FORM_STATUS_COMPLETED),
                title: completedCount.toString(),
                overline: ORDER_FORM_STATUS_COMPLETED,
              },
              {
                key: getStatusKey(ORDER_FORM_STATUS_VOID),
                title: voidCount.toString(),
                overline: ORDER_FORM_STATUS_VOID,
              },
            ]}
          />
        </Card>
      </Stack>

      <Box>
        {Boolean(pendingPurchaseOrderCount) && (
          <HomeStatLink
            href={`${orderFormModule.route.plural}?status=${ORDER_FORM_STATUS_PENDING_PURCHASE_ORDER}`}
            startIcon={<SendIcon fontSize="small" sx={{ color: 'grey.500' }} />}
          >
            {`${pendingPurchaseOrderCount} order forms pending purchase order`}
          </HomeStatLink>
        )}
      </Box>
    </>
  )
}

export default HomeProcurementTabOrderForm
