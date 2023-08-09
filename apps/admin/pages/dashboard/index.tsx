import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import {
  Alert,
  Box,
  Container,
  Grid,
  TabContent,
  Tabs,
  useTabs,
} from '@gravis-os/ui'
import HomeProcurementTab from '@admin/modules/Home/components/tabs/procurement/HomeProcurementTab'
import HomeSidebar from '@admin/modules/Home/components/HomeSidebar'
import HomeSalesTab from '@admin/modules/Home/components/tabs/sales/HomeSalesTab'
import HomeFinanceTab from '@admin/modules/Home/components/tabs/HomeFinanceTab'
import DashboardLayout from '@admin/layouts/DashboardLayout'

const ANALYTICS_TABS = [
  {
    key: 'sales',
    value: 'sales',
    label: 'Sales',
    children: <HomeSalesTab />,
  },
  {
    key: 'finance',
    value: 'finance',
    label: 'Finance',
    children: <HomeFinanceTab />,
  },
  {
    key: 'procurement',
    value: 'procurement',
    label: 'Procurement',
    children: <HomeProcurementTab />,
  },
]

const AnalyticsPage: NextPage = () => {
  const [displayBanner, setDisplayBanner] = useState<boolean>(true)
  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem('dismiss-banner')

    if (value === 'true') {
      // setDisplayBanner(false);
    }
  }, [])
  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
    setDisplayBanner(false)
  }

  const tabs = useTabs({ tabs: ANALYTICS_TABS })

  return (
    <>
      <Head>
        <title>Dashboard: Analytics</title>
      </Head>

      <DashboardLayout disablePadding>
        <Box component="main">
          <Container maxWidth={false} disableGutters>
            <Grid container spacing={0}>
              <HomeSidebar />

              {/* Main */}
              <Grid item xs={12} md={9}>
                {/* Tabs */}
                <Tabs disableGutterBottom {...tabs} />
                <TabContent {...tabs} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  )
}

export default AnalyticsPage
