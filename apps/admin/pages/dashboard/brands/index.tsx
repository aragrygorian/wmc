import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  brandPreviewFormSections,
  brandColumnDefs,
  brandModule,
} from '@admin/modules/Brand/brandConfig'

const BrandListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Brand List</title>
      </Head>

      <ListPage
        module={brandModule}
        columnDefs={brandColumnDefs}
        previewFormSections={brandPreviewFormSections}
      />
    </DashboardLayout>
  )
}

export default BrandListPage
