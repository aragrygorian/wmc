import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  projectGroupColumnDefs,
  projectGroupFilterFormSections,
  projectGroupModule,
  projectGroupPreviewFormSections,
} from '@admin/modules/ProjectGroup/projectGroupConfig'

const ProjectGroupListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Project Group List</title>
      </Head>

      <ListPage
        module={projectGroupModule}
        columnDefs={projectGroupColumnDefs}
        previewFormSections={projectGroupPreviewFormSections}
        filterFormSections={projectGroupFilterFormSections}
      />
    </DashboardLayout>
  )
}

export default ProjectGroupListPage
