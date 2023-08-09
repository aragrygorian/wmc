import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  feedbackColumnDefs,
  feedbackPreviewFormSections,
  feedbackModule,
} from '@admin/modules/Feedback/feedbackConfig'

const FeedbackListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Feedback List</title>
      </Head>

      <ListPage
        module={feedbackModule}
        columnDefs={feedbackColumnDefs}
        previewFormSections={feedbackPreviewFormSections}
      />
    </DashboardLayout>
  )
}

export default FeedbackListPage
