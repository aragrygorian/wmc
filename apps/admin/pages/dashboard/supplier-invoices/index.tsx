import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  supplierInvoiceColumnDefs,
  supplierInvoiceFilterFormSections,
  supplierInvoiceModule,
  supplierInvoicePreviewFormSections,
} from '@admin/modules/SupplierInvoice/supplierInvoiceConfig'

const SupplierInvoiceListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Supplier Invoice List</title>
      </Head>

      <ListPage
        module={supplierInvoiceModule}
        columnDefs={supplierInvoiceColumnDefs}
        previewFormSections={supplierInvoicePreviewFormSections}
        filterFormSections={supplierInvoiceFilterFormSections}
      />
    </DashboardLayout>
  )
}

export default SupplierInvoiceListPage
