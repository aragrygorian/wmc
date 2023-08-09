import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  purchaseOrderColumnDefs,
  purchaseOrderFilterFormSections,
  purchaseOrderPreviewFormSections,
} from '@admin/modules/PurchaseOrder/purchaseOrderConfig'
import purchaseOrderModule from '@admin/modules/PurchaseOrder/purchaseOrderModule'

const PurchaseOrderListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Purchase Order List</title>
      </Head>

      <ListPage
        module={purchaseOrderModule}
        columnDefs={purchaseOrderColumnDefs}
        previewFormSections={purchaseOrderPreviewFormSections}
        filterFormSections={purchaseOrderFilterFormSections}
        crudTableProps={{ disablePreview: true }}
      />
    </DashboardLayout>
  )
}

export default PurchaseOrderListPage
