import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  debitNotePreviewFormSections,
  debitNoteColumnDefs,
  debitNoteModule,
} from '@admin/modules/DebitNote/debitNoteConfig'

const DebitNoteListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Debit Note List</title>
      </Head>

      <ListPage
        module={debitNoteModule}
        columnDefs={debitNoteColumnDefs}
        previewFormSections={debitNotePreviewFormSections}
      />
    </DashboardLayout>
  )
}

export default DebitNoteListPage
