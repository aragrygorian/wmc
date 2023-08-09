import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  permissionColumnDefs,
  permissionModule,
  permissionPreviewFormSections,
} from '@admin/modules/Permission/permissionConfig'
import { ADMIN_PERMISSION } from '@admin/modules/Permission/constants'

const PermissionListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Permission List</title>
      </Head>

      <ListPage
        module={permissionModule}
        columnDefs={permissionColumnDefs}
        previewFormSections={permissionPreviewFormSections}
        crudTableProps={{
          setQuery: (query) => query.neq('title', ADMIN_PERMISSION),
        }}
      />
    </DashboardLayout>
  )
}

export default PermissionListPage
