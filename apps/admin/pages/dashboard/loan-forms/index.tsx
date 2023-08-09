import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  loanFormPreviewFormSections,
  loanFormColumnDefs,
  loanFormModule,
} from '@admin/modules/LoanForm/loanFormConfig'

const LoanFormListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Loan Form List</title>
      </Head>

      <ListPage
        module={loanFormModule}
        columnDefs={loanFormColumnDefs}
        previewFormSections={loanFormPreviewFormSections}
      />
    </DashboardLayout>
  )
}

export default LoanFormListPage
