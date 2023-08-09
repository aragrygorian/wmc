import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  categoryColumnDefs,
  categoryFilterFormSections,
  categoryModule,
  categoryPreviewFormSections,
} from '@admin/modules/Category/categoryConfig'

const CategoryListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Category List</title>
      </Head>

      <ListPage
        module={categoryModule}
        columnDefs={categoryColumnDefs}
        previewFormSections={categoryPreviewFormSections}
        filterFormSections={categoryFilterFormSections}
      />
    </DashboardLayout>
  )
}

export default CategoryListPage
