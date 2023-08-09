import React from 'react'

import Head from 'next/head'
import { NextPage } from 'next'
import {
  DocumentDetailPage,
  DocumentTypeEnum,
} from '@gravis-os/apps/accounting'
import { Alert, Container } from '@gravis-os/ui'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import { purchaseOrderFormSections } from '@admin/modules/PurchaseOrder/purchaseOrderConfig'
import purchaseOrderModule from '@admin/modules/PurchaseOrder/purchaseOrderModule'
import { purchaseOrderTabs } from '@admin/modules/PurchaseOrder/purchaseOrderTabs'
import PurchaseOrderReceiveItems from '@admin/modules/PurchaseOrder/components/PurchaseOrderReceiveItems'
import usePdfPrint from '@admin/hooks/usePdfPrint'

const PurchaseOrderDetailPage: NextPage = () => {
  const { isPrintMode } = usePdfPrint()

  const detailPageJSX = (
    <DocumentDetailPage
      type={DocumentTypeEnum.PURCHASE_ORDER}
      module={purchaseOrderModule}
      formSections={purchaseOrderFormSections}
      tabs={purchaseOrderTabs}
      bannerProps={{ cardProps: { hidden: true } }}
      tabsProps={{ sx: { display: isPrintMode ? 'none' : 'flex' } } as any}
      headerProps={{
        disableTitle: isPrintMode,
        disableBreadcrumbs: isPrintMode,
        actions: [<PurchaseOrderReceiveItems />],
      }}
      crudFormProps={{ disableHeader: isPrintMode }}
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
        <title>Dashboard: Purchase Order Detail</title>
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

export default PurchaseOrderDetailPage
