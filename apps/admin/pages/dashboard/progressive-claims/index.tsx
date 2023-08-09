import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  progressiveClaimColumnDefs,
  progressiveClaimFilterFormSections,
  progressiveClaimPreviewFormSections,
} from '@admin/modules/ProgressiveClaim/progressiveClaimConfig'
import progressiveClaimModule from '@admin/modules/ProgressiveClaim/progressiveClaimModule'

const ProgressiveClaimListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Progressive Claim List</title>
      </Head>

      <ListPage
        module={progressiveClaimModule}
        columnDefs={progressiveClaimColumnDefs}
        previewFormSections={progressiveClaimPreviewFormSections}
        crudTableProps={{ disableAdd: true, disablePreview: true }}
        filterFormSections={progressiveClaimFilterFormSections}
      />
    </DashboardLayout>
  )
}

export default ProgressiveClaimListPage
