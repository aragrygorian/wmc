import React from 'react'

import { routes } from '@admin/app/routes'
import Head from 'next/head'
import { NextPage } from 'next'
import { DetailPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  categoryFormSections,
  categoryModule,
} from '@admin/modules/Category/categoryConfig'

const CategoryDetailPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Category Detail</title>
      </Head>

      <DetailPage module={categoryModule} formSections={categoryFormSections} />
    </DashboardLayout>
  )
}

export default CategoryDetailPage
