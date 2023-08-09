import React from 'react'

import { routes } from '@admin/app/routes'
import Head from 'next/head'
import { NextPage } from 'next'
import { DetailPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  projectGroupFormSections,
  projectGroupModule,
} from '@admin/modules/ProjectGroup/projectGroupConfig'

const ProjectGroupDetailPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: ProjectGroup Detail</title>
      </Head>

      <DetailPage
        module={projectGroupModule}
        formSections={projectGroupFormSections}
      />
    </DashboardLayout>
  )
}

export default ProjectGroupDetailPage
