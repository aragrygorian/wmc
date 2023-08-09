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
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import RefreshIcon from '@mui/icons-material/Refresh'
import { DeliveryInstruction as PrismaPickAndPack } from '@prisma/client'
import { routes } from '@warehouse/app/routes'
import useUser from '@warehouse/app/useUser'
import { PickAndPackStatus } from '@warehouse/modules/PickAndPack/constants'
import useGetAllPickAndPacks from '@warehouse/modules/PickAndPack/hooks/useGetAllPickAndPacks'
import { getListCardItemsFromPickAndPacks } from '@warehouse/utils/getListCardItems'
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
    buttonProps: {
      href: routes.RECEIVE,
    },
  },
  { title: 'Deliver', icon: <LocalShippingIcon /> },
  { title: 'Products', icon: <ManageSearchIcon /> },
  { title: 'Movement', icon: <RefreshIcon /> },
]

const HomePage: NextPage = () => {
  /* User */
  const { user } = useUser()
  const userFullName = user?.full_name ?? '-'

  /* Data */
  const pickAndPacks: PrismaPickAndPack[] = useGetAllPickAndPacks()
  const [processingPickAndPacks, setProcessingPickAndPacks] = useState<
    PrismaPickAndPack[]
  >([])
  const [completedPickAndPacks, setCompletedPickAndPacks] = useState<
    PrismaPickAndPack[]
  >([])
  useEffect(() => {
    if (!isUndefined(pickAndPacks)) {
      const {
        [PickAndPackStatus.Processing]: fetchedProcessingPickAndPacks,
        [PickAndPackStatus.Completed]: fetchedCompletedPickAndPacks,
      } = groupBy(pickAndPacks, (pickAndPack) => pickAndPack.status)
      setProcessingPickAndPacks(fetchedProcessingPickAndPacks ?? [])
      setCompletedPickAndPacks(fetchedCompletedPickAndPacks ?? [])
    }
  }, [pickAndPacks])

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
          <ListCard
            items={[
              ...getListCardItemsFromPickAndPacks(
                processingPickAndPacks,
                PickAndPackStatus.Processing
              ),
              // TODO@Roby: Add proper driver coming once back end done
              {
                key: `drivers-on-the-way-list-card`,
                title: '2 Drivers On The Way',
                icon: <LocalShippingOutlinedIcon />,
              },
            ]}
          />
        </Stack>
        {/* Task Completed */}
        <Stack spacing={1}>
          <Typography variant="h4">Task Completed</Typography>
          <ListCard
            items={getListCardItemsFromPickAndPacks(
              completedPickAndPacks,
              PickAndPackStatus.Completed
            )}
          />
        </Stack>
      </Stack>
    </DashboardLayout>
  )
}

export default HomePage
