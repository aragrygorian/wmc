import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  memoColumnDefs,
  memoPreviewFormSections,
  memoModule,
} from '@admin/modules/Memo'

const MemoListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Memo List</title>
      </Head>

      <ListPage
        module={memoModule}
        columnDefs={memoColumnDefs}
        previewFormSections={memoPreviewFormSections}
      />
    </DashboardLayout>
  )
}

export default MemoListPage
