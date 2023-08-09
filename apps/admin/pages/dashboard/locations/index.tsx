import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  warehouseColumnDefs,
  warehouseFilterFormSections,
  warehouseModule,
  warehousePreviewFormSections,
} from '@admin/modules/Warehouse/warehouseConfig'

const WarehouseListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Warehouse List</title>
      </Head>

      <ListPage
        module={warehouseModule}
        columnDefs={warehouseColumnDefs}
        previewFormSections={warehousePreviewFormSections}
        filterFormSections={warehouseFilterFormSections}
      />
    </DashboardLayout>
  )
}

export default WarehouseListPage
