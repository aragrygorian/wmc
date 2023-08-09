import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  orderFormColumnDefs,
  orderFormFilterFormSections,
  orderFormModule,
} from '@admin/modules/OrderForm/orderFormConfig'

const OrderListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Order Form List</title>
      </Head>

      <ListPage
        module={orderFormModule}
        columnDefs={orderFormColumnDefs}
        crudTableProps={{ disableAdd: true }}
        filterFormSections={orderFormFilterFormSections}
      />
    </DashboardLayout>
  )
}

export default OrderListPage
