import { routes } from '@driver/app/routes'
import DashboardLayout from '@driver/layouts/DashboardLayout'
import useGetPickAndPackDetails from '@driver/modules/PickAndPack/hooks/useGetPickAndPackDetails'
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

const actionFooterActions: ReactNode[] = [
  <Button variant="contained" fullWidth href={routes.HOME}>
    CLOSE
  </Button>,
]

const PickAndPackLandingPage: NextPage = () => {
  /* Data */
  const pickAndPack = useGetPickAndPackDetails()
  const { title } = pickAndPack || {}

  return (
    <DashboardLayout>
      {/* If title exists */}
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
          <Typography variant="h3">{title} Collected.</Typography>
          {/* Caption */}
          <Typography variant="subtitle2" color="text.secondary">
            You have successfully collected a Pick & Pack {title}
          </Typography>
        </Stack>
      ) : (
        /* Loading */
        <Box
          minHeight="80vh"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          display="flex"
        >
          <CircularProgress />
        </Box>
      )}
      <ActionFooter actions={actionFooterActions} />
    </DashboardLayout>
  )
}

export default PickAndPackLandingPage
