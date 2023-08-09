import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  deliveryOrderColumnDefs,
  deliveryOrderFilterFormSections,
  deliveryOrderPreviewFormSections,
} from '@admin/modules/DeliveryOrder/deliveryOrderConfig'
import { deliveryOrderModule } from '@admin/modules/DeliveryOrder/deliveryOrderModule'
import { ListPage } from '@gravis-os/crud'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const DeliveryOrderListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Delivery Order List</title>
      </Head>

      <ListPage
        module={deliveryOrderModule}
        columnDefs={deliveryOrderColumnDefs}
        previewFormSections={deliveryOrderPreviewFormSections}
        filterFormSections={deliveryOrderFilterFormSections}
      />
    </DashboardLayout>
  )
}

export default DeliveryOrderListPage
