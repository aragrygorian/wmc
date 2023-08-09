import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  invoiceColumnDefs,
  invoiceFilterFormSections,
  invoicePreviewFormSections,
} from '@admin/modules/Invoice/invoiceConfig'
import invoiceModule from '@admin/modules/Invoice/invoiceModule'
import InvoiceTypeDialog from '@admin/modules/Invoice/components/InvoiceTypeDialog'

const InvoiceListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Invoice List</title>
      </Head>

      <ListPage
        module={invoiceModule}
        columnDefs={invoiceColumnDefs}
        previewFormSections={invoicePreviewFormSections}
        filterFormSections={invoiceFilterFormSections}
        crudTableProps={{
          headerProps: {
            renderAddButton: () => <InvoiceTypeDialog />,
          },
        }}
      />
    </DashboardLayout>
  )
}

export default InvoiceListPage
