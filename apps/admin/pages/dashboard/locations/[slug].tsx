import React from 'react'

import { routes } from '@admin/app/routes'
import Head from 'next/head'
import { NextPage } from 'next'
import { DetailPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  warehouseFormSections,
  warehouseModule,
} from '@admin/modules/Warehouse/warehouseConfig'

const WarehouseDetailPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Warehouse Detail</title>
      </Head>

      <DetailPage
        module={warehouseModule}
        formSections={warehouseFormSections}
      />
    </DashboardLayout>
  )
}

export default WarehouseDetailPage
