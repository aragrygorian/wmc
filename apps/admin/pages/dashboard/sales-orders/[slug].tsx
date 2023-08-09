import React from 'react'

import Head from 'next/head'
import { NextPage } from 'next'
import {
  DocumentDetailPage,
  DocumentTypeEnum,
} from '@gravis-os/apps/accounting'
import { Alert, Container } from '@gravis-os/ui'
import { salesOrderTabs } from 'src/modules/SalesOrder/salesOrderTabs'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import { salesOrderModule } from '@admin/modules/SalesOrder/salesOrderConfig'
import usePdfPrint from '@admin/hooks/usePdfPrint'

const SalesOrderDetailPage: NextPage = () => {
  const { isPrintMode } = usePdfPrint()

  const detailPageJSX = (
    <DocumentDetailPage
      type={DocumentTypeEnum.SALES_ORDER}
      module={salesOrderModule}
      tabs={salesOrderTabs}
      crudFormProps={{ disableHeader: isPrintMode }}
      headerProps={{ disableBreadcrumbs: isPrintMode }}
      tabsProps={{ sx: { display: isPrintMode ? 'none' : 'flex' } } as any}
      bannerProps={{
        cardProps: {
          sx: isPrintMode ? { background: 'none', boxShadow: 'none' } : null,
        },
      }}
      containerProps={{
        sx: isPrintMode
          ? { '& > .MuiDivider-root': { display: 'none' } }
          : null,
      }}
    />
  )

  if (isPrintMode) return detailPageJSX

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Sales Order Detail</title>
      </Head>

      <Container sx={{ mb: 2 }}>
        <Alert severity="warning">
          Under Construction. Unavailable for testing.
        </Alert>
      </Container>

      {detailPageJSX}
    </DashboardLayout>
  )
}

export default SalesOrderDetailPage
