import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  creditNotePreviewFormSections,
  creditNoteColumnDefs,
  creditNoteModule,
} from '@admin/modules/CreditNote/creditNoteConfig'

const CreditNoteListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Credit Note List</title>
      </Head>

      <ListPage
        module={creditNoteModule}
        columnDefs={creditNoteColumnDefs}
        previewFormSections={creditNotePreviewFormSections}
      />
    </DashboardLayout>
  )
}

export default CreditNoteListPage
