import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { DetailPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import { memoFormSections, memoModule } from '@admin/modules/Memo'

const MemoDetailPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Memo Detail</title>
      </Head>

      <DetailPage module={memoModule} formSections={memoFormSections} />
    </DashboardLayout>
  )
}

export default MemoDetailPage
