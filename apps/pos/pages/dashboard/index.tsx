import React from 'react'
import type { NextPage } from 'next'
import useUser from '@pos/app/useUser'
import SellIcon from '@mui/icons-material/Sell'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import NoteIcon from '@mui/icons-material/Note'
import PercentIcon from '@mui/icons-material/Percent'
import { PosAppCardGrid } from '@gravis-os/apps/pos'
import PosLayout from '@pos/layouts/PosLayout'
import { Box } from '@gravis-os/ui'
import { routes } from '@pos/app/routes'

const posAppCards = [
  {
    key: 'view-all-products',
    title: 'View All Products',
    color: 'success',
    iconElement: SellIcon,
    href: routes.POS_PRODUCTS,
  },
  {
    key: 'view-all-customers',
    title: 'View All Customers',
    color: 'primary',
    iconElement: PeopleAltIcon,
  },
  {
    key: 'add-note',
    title: 'Add Note',
    iconElement: NoteIcon,
  },
  {
    key: 'apply-discount',
    title: 'Apply Discount',
    iconElement: PercentIcon,
  },
]

const PosHomePage: NextPage = () => {
  return (
    <PosLayout disableRightAside>
      <Box sx={{ p: 2 }}>
        <PosAppCardGrid items={posAppCards} />
      </Box>
    </PosLayout>
  )
}

export default PosHomePage
