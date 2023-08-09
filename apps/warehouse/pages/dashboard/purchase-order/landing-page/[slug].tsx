import { ActionFooter, Box, Button, Stack, Typography } from '@gravis-os/ui'
import { routes } from '@warehouse/app/routes'
import DashboardLayout from '@warehouse/layouts/DashboardLayout'
import useGetPurchaseOrderDetails from '@warehouse/modules/PurchaseOrder/hooks/useGetPurchaseOrderDetails'
import { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import { LoaderIcon } from 'react-hot-toast'

const PurchaseOrderLandingPage: NextPage = () => {
  /* Data */
  const purchaseOrder = useGetPurchaseOrderDetails()
  const { title } = purchaseOrder || {}

  return (
    <DashboardLayout>
      {/* Title */}
      {title ? (
        <Stack
          minHeight="80vh"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          px={7}
          spacing={2}
        >
          {/* Check Icon */}
          <Image
            src="/static/warehouse_check_icon.png"
            height={56}
            width={56}
          />
          {/* Title */}
          <Typography variant="h3">{title} Received.</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            You have successfully received the items in {title}.
          </Typography>
        </Stack>
      ) : (
        <Box minHeight="80vh" justifyContent="center" alignItems="center">
          <LoaderIcon />
        </Box>
      )}
      <ActionFooter
        actions={[
          <Button variant="contained" fullWidth href={routes.HOME}>
            CLOSE
          </Button>,
        ]}
      />
    </DashboardLayout>
  )
}

export default PurchaseOrderLandingPage
