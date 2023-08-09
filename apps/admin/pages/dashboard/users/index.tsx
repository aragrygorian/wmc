import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  userColumnDefs,
  userFilterFormSections,
  userModule,
  userPreviewFormSections,
} from '@admin/modules/User/userConfig'

const UserListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: User List</title>
      </Head>

      <ListPage
        module={userModule}
        columnDefs={userColumnDefs}
        previewFormSections={userPreviewFormSections}
        filterFormSections={userFilterFormSections}
      />
    </DashboardLayout>
  )
}

export default UserListPage
