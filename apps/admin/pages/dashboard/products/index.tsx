import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  productSearchFormSections,
  productColumnDefs,
  productFilterFormSections,
  productPreviewFormSections,
} from '@admin/modules/Product/productConfig'
import productModule from '@admin/modules/Product/productModule'

const ProductListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Product List</title>
      </Head>

      <ListPage
        module={productModule}
        columnDefs={productColumnDefs}
        searchFormSections={productSearchFormSections}
        filterFormSections={productFilterFormSections}
        previewFormSections={productPreviewFormSections}
      />
    </DashboardLayout>
  )
}

export default ProductListPage
