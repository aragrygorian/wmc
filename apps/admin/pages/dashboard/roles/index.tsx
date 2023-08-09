import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  roleColumnDefs,
  roleModule,
  useRoleFormSections,
} from '@admin/modules/Role/roleConfig'

const RoleListPage: NextPage = () => {
  const previewFormSections = useRoleFormSections()

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Role List</title>
      </Head>

      <ListPage
        module={roleModule}
        columnDefs={roleColumnDefs}
        previewFormSections={previewFormSections}
      />
    </DashboardLayout>
  )
}

export default RoleListPage
