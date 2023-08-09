import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  orderColumnDefs,
  orderPreviewFormSections,
  orderModule,
} from '@admin/modules/Order/orderConfig'

const OrderListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Order List</title>
      </Head>

      <ListPage
        module={orderModule}
        columnDefs={orderColumnDefs}
        previewFormSections={orderPreviewFormSections}
      />
    </DashboardLayout>
  )
}

export default OrderListPage
