import useUser from '@driver/app/useUser'
import { DeliveryOrderStatus } from '@driver/modules/DeliveryOrder/constants'
import useGetAllDeliveryOrders from '@driver/modules/DeliveryOrder/hooks/useGetAllDeliveryOrders'
import { DeliveryOrder } from '@driver/modules/DeliveryOrder/types'
import { Warehouse } from '@driver/modules/Warehouse/types'
import { getWarehouseFromDeliveryOrders } from '@driver/modules/Warehouse/utils/getWarehouse'
import {
  getListCardItemsForTaskCompleted,
  getListCardItemsForTodaysActivities,
  getListCardItemsFromWarehouses,
} from '@driver/utils/getListCardItems'
import {
  Card,
  CardIconButtonRow,
  ListCard,
  Stack,
  Typography,
  VerticalIconButtonProps,
} from '@gravis-os/ui'
import InventoryIcon from '@mui/icons-material/Inventory'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import RefreshIcon from '@mui/icons-material/Refresh'
import { groupBy, isUndefined, map } from 'lodash'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../src/layouts/DashboardLayout'

export interface HomeButtonProps extends VerticalIconButtonProps {
  title: string
  icon: React.ReactNode
}

/** List of main home buttons */
const homeButtonProps: HomeButtonProps[] = [
  {
    title: 'Receive',
    icon: <InventoryIcon />,
  },
  { title: 'Deliver', icon: <LocalShippingIcon /> },
  { title: 'Products', icon: <ManageSearchIcon /> },
  { title: 'Movement', icon: <RefreshIcon /> },
]

/** Main landing page */
const HomePage: NextPage = () => {
  /* User */
  const { user } = useUser()
  const userFullName = user?.full_name ?? '-'

  /* Data */
  const deliveryOrders: DeliveryOrder[] = useGetAllDeliveryOrders()
  const [pendingDeliveryOrders, setPendingDeliveryOrders] = useState<
    DeliveryOrder[]
  >([])
  const [deliveredDeliveryOrders, setDeliveredDeliveryOrders] = useState<
    DeliveryOrder[]
  >([])
  const [partialDeliveryOrders, setPartialDeliveryOrders] = useState<
    DeliveryOrder[]
  >([])
  useEffect(() => {
    if (!isUndefined(deliveryOrders)) {
      const {
        [DeliveryOrderStatus.PendingDelivery]: fetchedPendingDeliveryOrders,
        [DeliveryOrderStatus.Delivered]: fetchedDeliveredDeliveryOrders,
        [DeliveryOrderStatus.DeliveredPartial]: fetchedPartialDeliveryOrders,
      } = groupBy(deliveryOrders, (deliveryOrder) => deliveryOrder.status)
      setPendingDeliveryOrders(fetchedPendingDeliveryOrders ?? [])
      setDeliveredDeliveryOrders(fetchedDeliveredDeliveryOrders ?? [])
      setPartialDeliveryOrders(fetchedPartialDeliveryOrders ?? [])
    }
  }, [deliveryOrders])

  const warehouses: Warehouse[] = getWarehouseFromDeliveryOrders(
    pendingDeliveryOrders
  )

  return (
    <DashboardLayout>
      {/* Welcome User Card */}
      <Card
        disablePadding
        disableLastGutterBottom
        disableBorderRadiusTop
        disableBorderRadiusBottom
        sx={{
          px: 2,
          py: 4,
          backgroundColor: 'primary.dark',
          width: '100%',
          mb: 1,
        }}
      >
        <Stack spacing={3}>
          {/* Welcome user */}
          <Stack spacing={1}>
            <Typography
              variant="h3"
              color="primary.contrastText"
            >{`Hi ${userFullName},`}</Typography>
            <Typography color="primary.contrastText">Welcome Back</Typography>
          </Stack>
          {/* Home page button rows */}
          <CardIconButtonRow
            items={map(homeButtonProps, (homeButtonProp) => ({
              ...homeButtonProp,
              typographyProps: { variant: 'body2' },
            }))}
            padding={2}
          />
        </Stack>
      </Card>
      {/* Main Card Body */}
      <Stack spacing={3} p={2}>
        {/* Pickup Locations */}
        <Stack spacing={1}>
          <Typography variant="h4">Pick Up Locations For Today</Typography>
          <ListCard items={getListCardItemsFromWarehouses(warehouses)} />
        </Stack>
        {/* Today's Activities */}
        <Stack spacing={1}>
          <Typography variant="h4">Today&apos;s Activities</Typography>
          <ListCard
            items={getListCardItemsForTodaysActivities(
              deliveredDeliveryOrders,
              [...pendingDeliveryOrders, ...deliveredDeliveryOrders]
            )}
          />
        </Stack>
        {/* Task Completed */}
        <Stack spacing={1}>
          <Typography variant="h4">Task Completed</Typography>
          <ListCard
            items={getListCardItemsForTaskCompleted(
              deliveredDeliveryOrders,
              partialDeliveryOrders,
              [...pendingDeliveryOrders, ...deliveredDeliveryOrders]
            )}
          />
        </Stack>
      </Stack>
    </DashboardLayout>
  )
}

export default HomePage
