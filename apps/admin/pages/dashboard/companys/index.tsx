import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  companyColumnDefs,
  companyFilterFormSections,
  companyPreviewFormSections,
  companyModule,
  companySearchFormSections,
} from '@admin/modules/Company/companyConfig'

const CompanyListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Company List</title>
      </Head>

      <ListPage
        module={companyModule}
        columnDefs={companyColumnDefs}
        searchFormSections={companySearchFormSections}
        filterFormSections={companyFilterFormSections}
        previewFormSections={companyPreviewFormSections}
      />
    </DashboardLayout>
  )
}

export default CompanyListPage
