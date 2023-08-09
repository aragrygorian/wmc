import React from 'react'

import { routes } from '@admin/app/routes'
import Head from 'next/head'
import { NextPage } from 'next'
import { DetailPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  orderFormSections,
  orderModule,
} from '@admin/modules/Order/orderConfig'

const OrderDetailPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Order Detail</title>
      </Head>

      <DetailPage module={orderModule} formSections={orderFormSections} />
    </DashboardLayout>
  )
}

export default OrderDetailPage
