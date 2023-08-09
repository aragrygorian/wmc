import React from 'react'

import { routes } from '@admin/app/routes'
import Head from 'next/head'
import { NextPage } from 'next'
import { DetailPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import { projectModule } from '@admin/modules/Project/projectConfig'
import { projectTabs } from '@admin/modules/Project/projectTabs'

const ProjectDetailPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Project Detail</title>
      </Head>

      <DetailPage tabs={projectTabs} module={projectModule} />
    </DashboardLayout>
  )
}

export default ProjectDetailPage
