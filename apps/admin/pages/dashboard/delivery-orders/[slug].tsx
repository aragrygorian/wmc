import React from 'react'

import Head from 'next/head'
import { NextPage } from 'next'
import {
  DocumentDetailPage,
  DocumentTypeEnum,
} from '@gravis-os/apps/accounting'
import { Alert, Container } from '@gravis-os/ui'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import { deliveryOrderModule } from '@admin/modules/DeliveryOrder/deliveryOrderModule'
import { deliveryOrderTabs } from '@admin/modules/DeliveryOrder/DeliveryOrderTabs'
import usePdfPrint from '@admin/hooks/usePdfPrint'

const DeliveryOrderDetailPage: NextPage = () => {
  const { isPrintMode } = usePdfPrint()

  const detailPageJSX = (
    <DocumentDetailPage
      tabs={deliveryOrderTabs}
      type={DocumentTypeEnum.DELIVERY_ORDER}
      module={deliveryOrderModule}
      bannerProps={{ cardProps: { hidden: isPrintMode } }}
      tabsProps={{ sx: { display: isPrintMode ? 'none' : 'flex' } } as any}
      headerProps={{
        disableTitle: isPrintMode,
        disableBreadcrumbs: isPrintMode,
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
        <title>Dashboard: Delivery Order Detail</title>
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

export default DeliveryOrderDetailPage
