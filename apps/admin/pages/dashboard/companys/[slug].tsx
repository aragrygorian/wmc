import React from 'react'

import { routes } from '@admin/app/routes'
import Head from 'next/head'
import { NextPage } from 'next'
import { DetailPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import { companyModule } from '@admin/modules/Company/companyConfig'
import { companyTabs } from '@admin/modules/Company/companyTabs'

const CompanyDetailPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Company Detail</title>
      </Head>

      <DetailPage tabs={companyTabs} module={companyModule} />
    </DashboardLayout>
  )
}

export default CompanyDetailPage
