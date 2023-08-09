import { routes } from '@driver/app/routes'
import DashboardLayout from '@driver/layouts/DashboardLayout'
import useGetDeliveryOrderDetails from '@driver/modules/DeliveryOrder/hooks/useGetDeliveryOrderDetails'
import {
  ActionFooter,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@gravis-os/ui'
import { isNil } from 'lodash'
import { NextPage } from 'next'
import Image from 'next/image'
import React, { ReactNode } from 'react'

/** Page rendered when delivery is successful */
const DriverLandingPage: NextPage = () => {
  const deliveryOrder = useGetDeliveryOrderDetails()
  const { title } = deliveryOrder || {}
  const actionFooterActions: ReactNode[] = [
    // Link back to homepage
    <Button
      variant="contained"
      fullWidth
      href={routes.HOME}
      sx={{ color: 'white', border: 0 }}
    >
      Close
    </Button>,
  ]

  return (
    <DashboardLayout>
      {/* Check if the delivery order title exists */}
      {!isNil(title) ? (
        <Stack
          minHeight="80vh"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          px={7}
          spacing={2}
        >
          {/* Check Icon */}
          <Image src="/static/driver_check_icon.png" height={56} width={56} />
          {/* Title */}
          <Typography variant="h3">{title} Delivered</Typography>
          {/* Caption */}
          <Typography variant="subtitle2" color="text.secondary">
            You have successfully completed a Delivery Order {title}
          </Typography>
        </Stack>
      ) : (
        // Else wait for content to load first
        <Box
          minHeight="80vh"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <CircularProgress />
        </Box>
      )}

      <ActionFooter actions={actionFooterActions} />
    </DashboardLayout>
  )
}

export default DriverLandingPage
