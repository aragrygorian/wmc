import React from 'react'

import { routes } from '@admin/app/routes'
import Head from 'next/head'
import { NextPage } from 'next'
import { DetailPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  feedbackFormSections,
  feedbackModule,
} from '@admin/modules/Feedback/feedbackConfig'

const FeedbackDetailPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Feedback Detail</title>
      </Head>

      <DetailPage module={feedbackModule} formSections={feedbackFormSections} />
    </DashboardLayout>
  )
}

export default FeedbackDetailPage
