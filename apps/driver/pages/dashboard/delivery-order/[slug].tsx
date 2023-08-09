import { routes } from '@driver/app/routes'
import DashboardLayout from '@driver/layouts/DashboardLayout'
import { DeliveryOrderStatus } from '@driver/modules/DeliveryOrder/constants'
import useGetDeliveryOrderDetails from '@driver/modules/DeliveryOrder/hooks/useGetDeliveryOrderDetails'
import {
  ActionFooter,
  ACTION_FOOTER_PADDING,
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@gravis-os/ui'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import dayjs from 'dayjs'
import {
  capitalize,
  filter,
  isEqual,
  isNil,
  kebabCase,
  map,
  subtract,
} from 'lodash'
import { NextPage } from 'next'
import React from 'react'

/** Represents an item for the deliveryOrder horizontal description */
interface DeliveryOrderTableItem {
  title: string
  description: string
}

/** Represents a delivery order product */
interface DeliveryOrderProduct {
  part: string
  name: string
  quantity: number
  deliveredQuantity?: number
}

/** Creates a small component which displays a pre-styled title and description */
const createVerticalTitleAndDescriptionComponent = (
  title: string,
  description: string
) => {
  return (
    <Stack spacing={0.5}>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="subtitle2">{description}</Typography>
    </Stack>
  )
}

/** Renders the specific delivery order details */
const DeliveryOrderDetailPage: NextPage = () => {
  /* Driver delivery order detail data */
  const deliveryOrder = useGetDeliveryOrderDetails()

  /**
   * Function used to extract information from the fetched deliveryOrder and format it as a table item.
   * @returns List of deliveryOrderTableItem to be used in the rendered Delivery Order card
   */
  const createDeliveryOrderTableItems = (): DeliveryOrderTableItem[] => {
    if (!deliveryOrder) return []
    const hasAddress =
      deliveryOrder.shipping_address_line_1 ||
      deliveryOrder.shipping_address_line_2 ||
      deliveryOrder.shipping_address_postal_code
    return [
      {
        title: 'Delivery Order No.',
        description: deliveryOrder.title ? `#${deliveryOrder.title}` : '-',
      },
      { title: 'Company', description: deliveryOrder.company?.title ?? '-' },
      {
        title: 'Address',
        description: hasAddress
          ? `${deliveryOrder.shipping_address_line_1} ${deliveryOrder.shipping_address_line_2} (${deliveryOrder.shipping_address_postal_code})`
          : '-',
      },
      { title: 'Contact', description: deliveryOrder.contact?.title ?? '-' },
      {
        title: 'Contact No.',
        description:
          deliveryOrder.contact?.mobile ?? deliveryOrder.contact?.phone ?? '-',
      },
    ]
  }

  // Driver information array to be rendered under driver information section
  const driverInformations: DeliveryOrderTableItem[] = [
    { title: 'Driver', description: deliveryOrder?.driver_name ?? '-' },
    { title: 'Vehicle', description: deliveryOrder?.vehicle_number ?? '-' },
    { title: 'Contact No.', description: deliveryOrder?.driver_contact ?? '-' },
    {
      title: 'Scheduled Date & Time',
      description: deliveryOrder?.delivery_at
        ? dayjs(deliveryOrder?.delivery_at).format('DD MMM YYYY hh:mm a')
        : '-',
    },
  ]

  /* Product Table */
  const itemsListTableItems: DeliveryOrderProduct[] = deliveryOrder?.lines
    ? // Remove faulty and zero quantities
      filter(
        map(deliveryOrder.lines, (line) => {
          return {
            part: line.product.model_code ? `#${line.product.model_code}` : '-',
            name: line.product.title ?? '-',
            quantity: line.quantity,
            deliveredQuantity: line.delivered_quantity ?? undefined,
          }
        }),
        (driverDeliveryOrderProduct) =>
          Boolean(driverDeliveryOrderProduct.quantity)
      )
    : []

  return (
    <DashboardLayout>
      <Box pb={ACTION_FOOTER_PADDING}>
        {/* The delivery order highlighted information */}
        <Card
          disableLastGutterBottom
          disableBorderRadiusBottom
          disableBorderRadiusTop
          sx={{ backgroundColor: 'primary.dark' }}
        >
          {/* The truck icon and Delivery Order text */}
          <Stack
            spacing={1}
            direction="row"
            pb={2}
            color="primary.contrastText"
          >
            <LocalShippingOutlinedIcon />
            <Typography variant="h4" color="primary.contrastText">
              Delivery Order
            </Typography>
          </Stack>
          {/* Table-like delivery order information */}
          {map(createDeliveryOrderTableItems(), (tableItem) => (
            <Grid
              container
              sx={{ my: 2 }}
              key={`table-item-${kebabCase(tableItem.title)}`}
            >
              <Grid item xs={5}>
                <Typography variant="body2" color="primary.contrastText">
                  {tableItem.title}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="subtitle2" color="primary.contrastText">
                  {tableItem.description}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Card>
        {/* Content outside the colored card */}
        <Stack spacing={2} p={2}>
          {/* Status and last updated */}
          <Card>
            <Stack spacing={1}>
              <Typography variant="h4">
                Status: {capitalize(deliveryOrder?.status ?? undefined) ?? '-'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last updated
              </Typography>
              <Typography variant="body1">
                {dayjs(deliveryOrder?.updated_at).format(
                  'DD MMM YYYY hh:mm a'
                ) ?? '-'}
              </Typography>
            </Stack>
          </Card>
          {/* Driver information */}
          <Card>
            <Grid container rowSpacing={2}>
              {map(driverInformations, (driverInformations) => {
                const { title, description } = driverInformations
                return (
                  <Grid item xs={6} key={`driver-info-${kebabCase(title)}`}>
                    {createVerticalTitleAndDescriptionComponent(
                      title,
                      description
                    )}
                  </Grid>
                )
              })}
            </Grid>
          </Card>
          {/* Product Line */}
          <Card title="Items List" disablePadding>
            {/* Product Table */}
            <Table>
              {/* Product Table Header */}
              <TableHead
                sx={{
                  backgroundColor: 'white',
                  borderBottom: 0.5,
                  borderColor: 'divider',
                }}
              >
                <TableRow>
                  <TableCell>Part #</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Qty</TableCell>
                </TableRow>
              </TableHead>
              {/* Product Table Content */}
              <TableBody>
                {map(itemsListTableItems, (itemsListTableItem, index) => {
                  const { part, name, quantity, deliveredQuantity } =
                    itemsListTableItem
                  return (
                    <TableRow key={`${kebabCase(name)}-${index}`}>
                      <TableCell>{part}</TableCell>
                      <TableCell>
                        <Stack spacing={1}>
                          <Typography variant="inherit">{name}</Typography>
                          {!isNil(deliveredQuantity) &&
                            !isEqual(deliveredQuantity, quantity) && (
                              <Chip
                                title={`NOT DELIVERED ${subtract(
                                  quantity,
                                  deliveredQuantity
                                )}`}
                                variant="outlined"
                                sx={{
                                  border: 0,
                                  color: 'red',
                                  backgroundColor: '#FDE2E0',
                                }}
                              />
                            )}
                        </Stack>
                      </TableCell>
                      <TableCell>{deliveredQuantity ?? quantity}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Card>
        </Stack>
      </Box>
      {/* Only show action footer for pending delivery orders */}
      {isEqual(deliveryOrder?.status, DeliveryOrderStatus.PendingDelivery) && (
        <ActionFooter
          actions={[
            <Button
              href={`${routes.CONFIRMATION_PAGE}/${deliveryOrder?.slug}`}
              sx={{ width: '100%', color: 'primary.contrastText', border: 0 }}
              variant="contained"
            >
              COMPLETE DELIVERY
            </Button>,
          ]}
        />
      )}
    </DashboardLayout>
  )
}

export default DeliveryOrderDetailPage
