import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import { accountsPayableModule } from '@admin/modules/SupplierInvoice/AccountsPayable/accountsPayableModule'
import { accountsPayableColumnDefs } from '@admin/modules/SupplierInvoice/AccountsPayable/accountsPayableConfig'
import { SUPPLIER_INVOICE_STATUS_UNPAID } from '@admin/modules/SupplierInvoice/constants'

const AccountsPayableListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Accounts Payable List</title>
      </Head>

      <ListPage
        module={accountsPayableModule}
        columnDefs={accountsPayableColumnDefs}
        crudTableProps={{
          disableActions: true,
          disableAdd: true,
          disablePreview: true,
          setQuery: (query) =>
            query.eq('status', SUPPLIER_INVOICE_STATUS_UNPAID),
        }}
      />
    </DashboardLayout>
  )
}

export default AccountsPayableListPage
