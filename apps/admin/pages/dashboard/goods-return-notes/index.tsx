import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  goodsReturnNotePreviewFormSections,
  goodsReturnNoteColumnDefs,
  goodsReturnNoteModule,
} from '@admin/modules/GoodsReturnNote/goodsReturnNoteConfig'

const GoodsReturnNoteListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Goods Return Note List</title>
      </Head>

      <ListPage
        module={goodsReturnNoteModule}
        columnDefs={goodsReturnNoteColumnDefs}
        previewFormSections={goodsReturnNotePreviewFormSections}
      />
    </DashboardLayout>
  )
}

export default GoodsReturnNoteListPage
