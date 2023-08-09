import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { routes } from '@admin/app/routes'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  deliveryInstructionColumnDefs,
  deliveryInstructionFilterFormSections,
} from '@admin/modules/DeliveryInstruction/deliveryInstructionConfig'
import { deliveryInstructionModule } from '@admin/modules/DeliveryInstruction/deliveryInstructionModule'

const DeliveryInstructionListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Delivery Order List</title>
      </Head>

      <ListPage
        module={deliveryInstructionModule}
        columnDefs={deliveryInstructionColumnDefs}
        crudTableProps={{ headerProps: { disableAdd: true } }}
        filterFormSections={deliveryInstructionFilterFormSections}
      />
    </DashboardLayout>
  )
}

export default DeliveryInstructionListPage
