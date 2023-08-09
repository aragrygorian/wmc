import React from 'react'

import { routes } from '@admin/app/routes'
import Head from 'next/head'
import { NextPage } from 'next'
import { DetailPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  permissionFormSections,
  permissionModule,
} from '@admin/modules/Permission/permissionConfig'

const PermissionDetailPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Permission Detail</title>
      </Head>

      <DetailPage
        module={permissionModule}
        formSections={permissionFormSections}
      />
    </DashboardLayout>
  )
}

export default PermissionDetailPage
