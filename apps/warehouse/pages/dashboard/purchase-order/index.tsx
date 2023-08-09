import { TextField } from '@gravis-os/fields'
import { BackButton, Button, Stack } from '@gravis-os/ui'
import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment } from '@mui/material'
import { PurchaseOrder as PrismaPurchaseOrder } from '@prisma/client'
import { routes } from '@warehouse/app/routes'
import DashboardLayout from '@warehouse/layouts/DashboardLayout'
import PurchaseOrderTabs, {
  PurchaseOrderTabsItemProps,
} from '@warehouse/modules/PurchaseOrder/components/PurchaseOrderTabs'
import useGetAllPurchaseOrders from '@warehouse/modules/PurchaseOrder/hooks/useGetAllPurchaseOrders'
import { PurchaseOrderStatus } from '@warehouse/modules/PurchaseOrder/utils/constants'
import getInfoCardsFromPurchaseOrders from '@warehouse/modules/PurchaseOrder/utils/getInfoCardsFromPurchaseOrders'
import { filter, isEqual } from 'lodash'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

const PurchaseOrderPage: NextPage = () => {
  /* Data */
  const purchaseOrders = useGetAllPurchaseOrders()
  const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState<
    PrismaPurchaseOrder[]
  >([])
  useEffect(() => {
    setFilteredPurchaseOrders(purchaseOrders)
  }, [purchaseOrders])
  const pendingPurchaseOrders: PrismaPurchaseOrder[] = filter(
    filteredPurchaseOrders,
    (purchaseOrder) =>
      isEqual(purchaseOrder.status, PurchaseOrderStatus.PendingStockArrival)
  )
  const receivedPurchaseOrders: PrismaPurchaseOrder[] = filter(
    filteredPurchaseOrders,
    (purchaseOrder) =>
      isEqual(purchaseOrder.status, PurchaseOrderStatus.GoodsReceived)
  )

  /* Tabs */
  const purchaseOrderTabs: PurchaseOrderTabsItemProps[] = [
    {
      index: 0,
      items: getInfoCardsFromPurchaseOrders(pendingPurchaseOrders),
    },
    {
      index: 1,
      items: getInfoCardsFromPurchaseOrders(receivedPurchaseOrders),
    },
  ]

  return (
    <DashboardLayout>
      <Stack spacing={2} p={2}>
        {/* Back Button */}
        <BackButton
          title="Receive Purchase Order"
          href={routes.RECEIVE}
          sx={{ left: 0, mr: 'auto' }}
        />
        {/* Search Bar and Button */}
        <Stack direction="row" spacing={2}>
          <TextField
            placeholder="Search PO ID"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained">Search</Button>
        </Stack>
        {/* List of Purchase Orders */}
        <PurchaseOrderTabs tabs={purchaseOrderTabs} />
      </Stack>
    </DashboardLayout>
  )
}

export default PurchaseOrderPage
