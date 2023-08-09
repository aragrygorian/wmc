import { ActionFooter, Box, Button, Stack } from '@gravis-os/ui'
import { Typography } from '@mui/material'
import { routes } from '@warehouse/app/routes'
import DashboardLayout from '@warehouse/layouts/DashboardLayout'
import useGetPickAndPackDetails from '@warehouse/modules/PickAndPack/hooks/useGetPickAndPackDetails'
import { NextPage } from 'next'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { LoaderIcon } from 'react-hot-toast'

const actionFooterActions: ReactNode[] = [
  <Button variant="contained" fullWidth href={routes.HOME}>
    Close
  </Button>,
]

const PickAndPackLandingPage: NextPage = () => {
  /* Data */
  const pickAndPack = useGetPickAndPackDetails()
  const { title } = pickAndPack || {}

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
          <Typography variant="h3">{title} Completed</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            You have successfully completed a Pick & Pack {title}. The assigned
            driver will be notified.
          </Typography>
        </Stack>
      ) : (
        <Box minHeight="80vh" justifyContent="center" alignItems="center">
          <LoaderIcon />
        </Box>
      )}
      <ActionFooter actions={actionFooterActions} />
    </DashboardLayout>
  )
}

export default PickAndPackLandingPage
