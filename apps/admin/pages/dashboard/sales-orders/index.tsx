import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  salesOrderColumnDefs,
  salesOrderFilterFormSections,
  salesOrderModule,
  salesOrderPreviewFormSections,
} from '@admin/modules/SalesOrder/salesOrderConfig'

const SalesOrderListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Sales Order List</title>
      </Head>

      <ListPage
        module={salesOrderModule}
        columnDefs={salesOrderColumnDefs}
        previewFormSections={salesOrderPreviewFormSections}
        filterFormSections={salesOrderFilterFormSections}
      />
    </DashboardLayout>
  )
}

export default SalesOrderListPage
