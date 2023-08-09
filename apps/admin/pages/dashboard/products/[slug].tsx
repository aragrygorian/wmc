import React from 'react'

import { routes } from '@admin/app/routes'
import Head from 'next/head'
import { NextPage } from 'next'
import { DetailPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import productModule from '@admin/modules/Product/productModule'
import { productTabs } from '@admin/modules/Product/productTabs'

const ProductDetailPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Product Detail</title>
      </Head>

      <DetailPage module={productModule} tabs={productTabs} />
    </DashboardLayout>
  )
}

export default ProductDetailPage
