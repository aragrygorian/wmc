import React from 'react'

import { routes } from '@admin/app/routes'
import Head from 'next/head'
import { NextPage } from 'next'
import { DetailPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  serviceFormSections,
  serviceModule,
} from '@admin/modules/Service/serviceConfig'

const ServiceDetailPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Service Detail</title>
      </Head>

      <DetailPage module={serviceModule} formSections={serviceFormSections} />
    </DashboardLayout>
  )
}

export default ServiceDetailPage
