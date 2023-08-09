import { routes } from '@driver/app/routes'
import {
  DeliveryOrderStatus,
  DELIVERY_ORDER_STATUS_QUERY_KEY,
} from '@driver/modules/DeliveryOrder/constants'
import { Box, InfoCard, InfoCardProps, Stack } from '@gravis-os/ui'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import { Tab, Tabs } from '@mui/material'
import {
  findIndex,
  isEqual,
  isUndefined,
  kebabCase,
  map,
  upperCase,
} from 'lodash'
import { useRouter } from 'next/router'
import React, { FC, ReactElement, SyntheticEvent, useState } from 'react'

/** List of labels for the tab header */
export const deliveryOrderTabsLabels = [
  DeliveryOrderStatus.PendingDelivery,
  DeliveryOrderStatus.Delivered,
  DeliveryOrderStatus.DeliveredPartial,
]

/**
 * Represents an individual item entry in a driver delivery order tab.
 *
 * @prop {string} title
 * @prop {string} status?
 * @prop {string} company?
 * @prop {string} address?
 * @prop {string} slug?
 */
export interface DeliveryOrderTabsItemProps {
  /** Title of the DriverDeliveryOrder, e.g., DO-0001 */
  title: string
  /** Status of the DriverDeliveryOrder to be displayed as a Chip */
  status?: string
  /** Company associated with the DriverDeliveryOrder and displayed in the card content */
  company?: string
  /** Address associated with the DriverDeliveryOrder displayed below company */
  address?: string
  /** Slug used to redirect user to detail page */
  slug?: string
}

/**
 * Property of the DriverDeliveryOrderTabs component.
 *
 * @prop {DeliveryOrderTabsItemProps[][]} items
 */
export interface DeliveryOrderTabsProps {
  /**
   * Array of list of DriverDeliveryOrderTabsItemProps.
   *
   * The nested array contains the content of the tabs.
   * The main array represent number mapping of the tabValue to each of the tab items.
   */
  items: DeliveryOrderTabsItemProps[][]
}

const DeliveryOrderTabs: FC<DeliveryOrderTabsProps> = (props): ReactElement => {
  const { items } = props

  /* Router & Queries */
  const router = useRouter()
  // Used to determine which tab to display on page load
  const { [DELIVERY_ORDER_STATUS_QUERY_KEY]: pageStatus } = router.query

  const [currentTabValue, setCurrentTabValue] = useState<number>(
    !isUndefined(pageStatus)
      ? findIndex(deliveryOrderTabsLabels, (label) =>
          isEqual(label, pageStatus)
        )
      : 0
  )

  const handleTabsChange = (_event: SyntheticEvent, newValue: number) => {
    setCurrentTabValue(newValue)
  }

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Tabs
          value={currentTabValue}
          onChange={handleTabsChange}
          variant="scrollable"
        >
          {deliveryOrderTabsLabels.map((driverDeliveryOrderTabsLabel) => (
            <Tab
              label={upperCase(driverDeliveryOrderTabsLabel)}
              key={`delivery-order-tab-${kebabCase(
                driverDeliveryOrderTabsLabel
              )}`}
              sx={{ px: { xs: 3, md: 4, lg: 5 }, textAlign: 'center' }}
            />
          ))}
        </Tabs>
      </Box>
      {/* Content */}
      {items.map((driverDeliveryOrderTabsItemProps, i) => {
        return (
          // Only render if the currentTabValue is equal to the current key
          isEqual(currentTabValue, i) && (
            // Stack wrapper to space out the InfoCard
            <Stack spacing={2}>
              {map(
                driverDeliveryOrderTabsItemProps,
                (driverDeliveryOrderTabsItemProp) => {
                  const { title, status, company, address, slug } =
                    driverDeliveryOrderTabsItemProp
                  /* Info card */
                  const infoCardProps: InfoCardProps = {
                    key: kebabCase(title),
                    title,
                    chip: status,
                    items: [
                      { title: 'Company', description: company },
                      { title: 'Address', description: address },
                    ],
                    icon: <LocalShippingOutlinedIcon color="primary" />,
                    // Don't allow users to click one delivered orders
                    ...(!isEqual(status, DeliveryOrderStatus.Delivered) && {
                      href: `${routes.DELIVERY_ORDER}/${slug}`,
                    }),
                  }
                  return <InfoCard {...infoCardProps} />
                }
              )}
            </Stack>
          )
        )
      })}
    </>
  )
}

export default DeliveryOrderTabs
