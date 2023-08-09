import { routes } from '@driver/app/routes'
import DashboardLayout from '@driver/layouts/DashboardLayout'
import DeliveryOrderFilterDrawer, {
  DeliveryOrderFilterKey,
} from '@driver/modules/DeliveryOrder/components/DeliveryOrderDrawer'
import DeliveryOrderFilterRow from '@driver/modules/DeliveryOrder/components/DeliveryOrderFilterRow'
import DeliveryOrderTabs, {
  DeliveryOrderTabsProps,
} from '@driver/modules/DeliveryOrder/components/DeliveryOrderTabs'
import { DeliveryOrderStatus } from '@driver/modules/DeliveryOrder/constants'
import useGetAllDeliveryOrders from '@driver/modules/DeliveryOrder/hooks/useGetAllDeliveryOrders'
import { DeliveryOrder } from '@driver/modules/DeliveryOrder/types'
import { getDeliveryOrderTabsItemsFromDeliveryOrders } from '@driver/modules/DeliveryOrder/utils/getDeliveryOrderTabsItems'
import { Form } from '@gravis-os/form'
import { TextField } from '@gravis-os/fields'
import { BackButton, Button, IconButton, Stack } from '@gravis-os/ui'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment } from '@mui/material'
import {
  entries,
  filter,
  groupBy,
  includes,
  isEmpty,
  isEqual,
  isUndefined,
  lowerCase,
  map,
  omit,
} from 'lodash'
import { NextPage } from 'next'
import React, { ChangeEvent, useEffect, useState } from 'react'

/** Shows list of tabbed delivery orders based on completion status. */
const DeliveryOrderPage: NextPage = () => {
  /* Data */
  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrder[]>([])
  const [pendingDeliveryOrders, setPendingDeliveryOrders] = useState<
    DeliveryOrder[]
  >([])
  const [deliveredDeliveryOrders, setDeliveredDeliveryOrders] = useState<
    DeliveryOrder[]
  >([])
  const [partialDeliveredDeliveryOrders, setPartialDeliveredDeliveryOrders] =
    useState<DeliveryOrder[]>([])
  const fetchedDeliveryOrders: DeliveryOrder[] = useGetAllDeliveryOrders()

  // Update delivery orders when fetched delivery order changes
  useEffect(() => {
    if (fetchedDeliveryOrders) setDeliveryOrders(fetchedDeliveryOrders)
  }, [fetchedDeliveryOrders])

  // Update respective delivery order lists
  useEffect(() => {
    if (!isUndefined(deliveryOrders)) {
      const {
        [DeliveryOrderStatus.PendingDelivery]: fetchedPendingDeliveryOrders,
        [DeliveryOrderStatus.Delivered]: fetchedDeliveredDeliveryOrders,
        [DeliveryOrderStatus.DeliveredPartial]: fetchedPartialDeliveryOrders,
      } = groupBy(deliveryOrders, (deliveryOrder) => deliveryOrder.status)
      setPendingDeliveryOrders(fetchedPendingDeliveryOrders ?? [])
      setDeliveredDeliveryOrders(fetchedDeliveredDeliveryOrders ?? [])
      setPartialDeliveredDeliveryOrders(fetchedPartialDeliveryOrders ?? [])
    }
  }, [deliveryOrders])

  /* Search */
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const handleSearchOnChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setSearchQuery(target.value)
  }

  const handleSearchSubmit = () => {
    if (searchQuery) {
      // If search query exists
      setDeliveryOrders(
        filter(fetchedDeliveryOrders, (deliveryOrder) =>
          includes(lowerCase(deliveryOrder.title), lowerCase(searchQuery))
        )
      )
    } else {
      // Else just set content back to original list
      setDeliveryOrders(fetchedDeliveryOrders)
    }
  }

  /* Tabs */
  const tabsItems: DeliveryOrderTabsProps['items'] = [
    getDeliveryOrderTabsItemsFromDeliveryOrders(pendingDeliveryOrders),
    getDeliveryOrderTabsItemsFromDeliveryOrders(deliveredDeliveryOrders),
    getDeliveryOrderTabsItemsFromDeliveryOrders(partialDeliveredDeliveryOrders),
  ]

  /* Filter */
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false)
  const [searchFilter, setSearchFilter] = useState<Record<string, string>>({})
  const [selectedSearchFilter, setSelectedSearchFilter] = useState<
    Record<string, string>
  >({})
  const handleFilterOnSubmit = () => {
    /* Company Filter */
    setDeliveryOrders(
      filter(fetchedDeliveryOrders, (deliveryOrder) =>
        isEqual(
          deliveryOrder?.company?.title ?? '-',
          searchFilter[DeliveryOrderFilterKey.Company]
        )
      )
    )

    setSelectedSearchFilter(searchFilter)

    /* Close */
    setShowFilterDrawer(false)
  }

  const handleFilterOnDelete = (key: string) => {
    const nextFilterState = omit(searchFilter, [key])
    setSearchFilter(nextFilterState)
    setSelectedSearchFilter(nextFilterState)
    if (isEmpty(nextFilterState)) {
      setDeliveryOrders(fetchedDeliveryOrders)
    }
  }

  return (
    <DashboardLayout>
      <Stack spacing={2} p={2}>
        {/* Return Button */}
        <BackButton
          title="Delivery Order"
          href={routes.HOME}
          sx={{ left: 0, mr: 'auto' }}
        />
        {/* Search bar */}
        <Stack direction="row" spacing={1}>
          <Form
            onSubmit={handleSearchSubmit}
            formJsx={
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ backgroundColor: 'white' }}
                value={searchQuery}
                onChange={handleSearchOnChange}
                placeholder="Search DO ID"
              />
            }
          />
          <Button
            variant="contained"
            sx={{ color: 'white', border: 0 }}
            onClick={handleSearchSubmit}
          >
            Search
          </Button>
          {/* Filter */}
          <IconButton onClick={() => setShowFilterDrawer(!showFilterDrawer)}>
            <FilterAltOutlinedIcon />
          </IconButton>
          <DeliveryOrderFilterDrawer
            open={showFilterDrawer}
            filter={searchFilter}
            setFilter={setSearchFilter}
            onSubmit={handleFilterOnSubmit}
            onClose={() => setShowFilterDrawer(false)}
          />
        </Stack>
        {/* Filter Row */}
        <DeliveryOrderFilterRow
          items={map(entries(selectedSearchFilter), ([key, value]) => ({
            filterKey: key,
            title: value,
          }))}
          onDelete={handleFilterOnDelete}
        />
        <DeliveryOrderTabs items={tabsItems} />
      </Stack>
    </DashboardLayout>
  )
}

export default DeliveryOrderPage
