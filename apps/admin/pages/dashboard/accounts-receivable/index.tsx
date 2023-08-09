import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ListPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import { INVOICE_STATUS_UNPAID } from '@admin/modules/Invoice/constants'
import { accountsReceivableModule } from '@admin/modules/Invoice/AccountsReceivable/accountsReceivableModule'
import { accountsReceivableColumnDefs } from '@admin/modules/Invoice/AccountsReceivable/accountsReceivableConfig'

const AccountsReceivableListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Accounts Receivable List</title>
      </Head>

      <ListPage
        module={accountsReceivableModule}
        columnDefs={accountsReceivableColumnDefs}
        crudTableProps={{
          disableActions: true,
          disableAdd: true,
          disablePreview: true,
          setQuery: (query) => query.eq('status', INVOICE_STATUS_UNPAID),
        }}
      />
    </DashboardLayout>
  )
}

export default AccountsReceivableListPage
