import {
  Card,
  CardIconButtonRow,
  Stack,
  Typography,
  VerticalIconButtonProps,
} from '@gravis-os/ui'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import RefreshIcon from '@mui/icons-material/Refresh'
import { DeliveryInstruction as PrismaPickAndPack } from '@prisma/client'
import useUser from '@salesperson/app/useUser'
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
  { title: 'Deliver', icon: <LocalShippingIcon /> },
  { title: 'Products', icon: <ManageSearchIcon /> },
  { title: 'Movement', icon: <RefreshIcon /> },
]

const HomePage: NextPage = () => {
  /* User */
  const { user } = useUser()
  const userFullName = user?.full_name ?? '-'

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
              iconBoxProps: { borderRadius: 1 },
            }))}
            padding={2}
          />
        </Stack>
      </Card>
      {/* Main Card Body */}
      <Stack spacing={3} p={2}>
        {/* Today's Activities */}
        <Stack spacing={1}>
          <Typography variant="h4">Today&apos;s Activities</Typography>
        </Stack>
      </Stack>
    </DashboardLayout>
  )
}

export default HomePage
