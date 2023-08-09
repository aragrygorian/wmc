import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  currencyFactorColumnDefs,
  currencyFactorModule,
  currencyFactorPreviewFormSections,
} from '@admin/modules/CurrencyFactor/currencyFactorConfig'

const CurrencyFactorListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: CurrencyFactor List</title>
      </Head>

      <ListPage
        module={currencyFactorModule}
        columnDefs={currencyFactorColumnDefs}
        previewFormSections={currencyFactorPreviewFormSections}
      />
    </DashboardLayout>
  )
}

export default CurrencyFactorListPage
