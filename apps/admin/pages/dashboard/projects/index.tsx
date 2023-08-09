import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import type { Theme } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import getProjectStatusColor from '@admin/modules/Project/utils/getProjectStatusColor'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  projectColumnDefs as defaultProjectColumnDefs,
  projectFilterFormSections,
  projectModule,
  projectPreviewFormSections,
} from '@admin/modules/Project/projectConfig'
import StatusCell from '@admin/components/StatusCell'

const ProjectListPage: NextPage = () => {
  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const projectColumnDefs = [
    ...defaultProjectColumnDefs,
    {
      field: 'status',
      pinned: isMdUp ? 'right' : false,
      cellRenderer: ({ value }) => (
        <StatusCell color={getProjectStatusColor(value)} label={value} />
      ),
    },
  ]

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Project List</title>
      </Head>

      <ListPage
        module={projectModule}
        columnDefs={projectColumnDefs}
        previewFormSections={projectPreviewFormSections}
        filterFormSections={projectFilterFormSections}
      />
    </DashboardLayout>
  )
}

export default ProjectListPage
