import { routes } from '@driver/app/routes'
import {
  DeliveryOrderStatus,
  DELIVERY_ORDER_STATUS_QUERY_KEY,
} from '@driver/modules/DeliveryOrder/constants'
import { DeliveryOrder } from '@driver/modules/DeliveryOrder/types'
import { PickAndPackStatus } from '@driver/modules/PickAndPack/types'
import { Warehouse } from '@driver/modules/Warehouse/types'
import { Chip, ListCardItemProps, Stack } from '@gravis-os/ui'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { filter, isEqual, kebabCase, map, size, toString } from 'lodash'
import Router from 'next/router'
import React from 'react'

export const getListCardItemsFromWarehouses = (
  warehouses: Warehouse[]
): ListCardItemProps[] =>
  map(warehouses, (warehouse) => ({
    key: kebabCase(warehouse.title),
    title: `${warehouse.title}`,
    icon: (
      <Stack spacing={1} direction="row" alignItems="center" pr={2}>
        <StorefrontIcon />
        <Chip
          title={
            warehouse.pick_and_packs
              ? toString(
                  size(
                    filter(warehouse.pick_and_packs, (pickAndPack) =>
                      isEqual(
                        pickAndPack.status,
                        PickAndPackStatus.ReadyForCollection
                      )
                    )
                  )
                )
              : '0'
          }
          color="primary"
        />
      </Stack>
    ),
    onClick: () => Router.push(`${routes.WAREHOUSE}/${warehouse.slug}`),
  }))

export const getListCardItemsForTaskCompleted = (
  completedDeliveries: DeliveryOrder[],
  partialDeliveries: DeliveryOrder[],
  totalDeliveries: DeliveryOrder[]
): ListCardItemProps[] => {
  const numberOfDeliveriesMade = size(completedDeliveries)
  const numberOfTotalDeliveries = size(totalDeliveries)
  const numberOfPartialDeliveries = size(partialDeliveries)
  return [
    {
      key: `${numberOfDeliveriesMade}-${numberOfTotalDeliveries}-deliveries-made`,
      title: `${numberOfDeliveriesMade}/${numberOfTotalDeliveries} ${
        isEqual(numberOfDeliveriesMade, 1) ? 'Delivery' : 'Deliveries'
      } made`,
      icon: <LocalShippingIcon />,
      onClick: () =>
        Router.push({
          pathname: routes.DELIVERY_ORDER,
          query: {
            [DELIVERY_ORDER_STATUS_QUERY_KEY]: DeliveryOrderStatus.Delivered,
          },
        }),
    },
    {
      key: `${numberOfPartialDeliveries}-partial-deliveries-made`,
      title: `${numberOfPartialDeliveries} Partial ${
        isEqual(numberOfPartialDeliveries, 1) ? 'delivery' : 'deliveries'
      } made`,
      icon: <LocalShippingIcon />,
      onClick: () =>
        Router.push({
          pathname: routes.DELIVERY_ORDER,
          query: {
            [DELIVERY_ORDER_STATUS_QUERY_KEY]:
              DeliveryOrderStatus.DeliveredPartial,
          },
        }),
    },
  ]
}

export const getListCardItemsForTodaysActivities = (
  deliveriesMade: DeliveryOrder[],
  totalDeliveries: DeliveryOrder[]
): ListCardItemProps[] => {
  const numberOfDeliveriesToMake = size(totalDeliveries) - size(deliveriesMade)
  return [
    {
      key: `${numberOfDeliveriesToMake}-deliveries-to-make`,
      title: `${numberOfDeliveriesToMake} ${
        isEqual(numberOfDeliveriesToMake, 1) ? 'Delivery' : 'Deliveries'
      } to make`,
      icon: <LocalShippingIcon />,
      onClick: () =>
        Router.push({
          pathname: routes.DELIVERY_ORDER,
          query: {
            [DELIVERY_ORDER_STATUS_QUERY_KEY]:
              DeliveryOrderStatus.PendingDelivery,
          },
        }),
    },
  ]
}
