import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  serviceColumnDefs,
  serviceFilterFormSections,
  serviceModule,
  servicePreviewFormSections,
} from '@admin/modules/Service/serviceConfig'

const ServiceListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Service List</title>
      </Head>

      <ListPage
        module={serviceModule}
        columnDefs={serviceColumnDefs}
        previewFormSections={servicePreviewFormSections}
        filterFormSections={serviceFilterFormSections}
      />
    </DashboardLayout>
  )
}

export default ServiceListPage
