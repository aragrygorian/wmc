import React from 'react'

import { routes } from '@admin/app/routes'
import Head from 'next/head'
import { NextPage } from 'next'
import { DetailPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  currencyFactorFormSections,
  currencyFactorModule,
} from '@admin/modules/CurrencyFactor/currencyFactorConfig'

const CurrencyFactorDetailPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: CurrencyFactor Detail</title>
      </Head>

      <DetailPage
        module={currencyFactorModule}
        formSections={currencyFactorFormSections}
      />
    </DashboardLayout>
  )
}

export default CurrencyFactorDetailPage
