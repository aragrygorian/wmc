import React from 'react'

import { routes } from '@admin/app/routes'
import Head from 'next/head'
import { NextPage } from 'next'
import { DetailPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  brandFormSections,
  brandModule,
} from '@admin/modules/Brand/brandConfig'

const BrandDetailPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Brand Detail</title>
      </Head>

      {/* TODO@Joel: Patch this typing */}
      <DetailPage
        module={brandModule}
        formSections={brandFormSections as any}
      />
    </DashboardLayout>
  )
}

export default BrandDetailPage
