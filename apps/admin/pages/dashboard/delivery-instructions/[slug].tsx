import React from 'react'

import Head from 'next/head'
import { NextPage } from 'next'
import {
  DocumentDetailPage,
  DocumentTypeEnum,
} from '@gravis-os/apps/accounting'
import { Alert, Container } from '@gravis-os/ui'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import { deliveryInstructionFormSections } from '@admin/modules/DeliveryInstruction/deliveryInstructionConfig'
import { deliveryInstructionModule } from '@admin/modules/DeliveryInstruction/deliveryInstructionModule'

const DeliveryInstructionDetailPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Pick & Pack Detail</title>
      </Head>

      <Container sx={{ mb: 2 }}>
        <Alert severity="warning">
          Under Construction. Unavailable for testing.
        </Alert>
      </Container>

      <DocumentDetailPage
        type={DocumentTypeEnum.DELIVERY_ORDER}
        module={deliveryInstructionModule}
        formSections={deliveryInstructionFormSections}
        crudFormProps={{
          disableHeader: true,
        }}
      />
    </DashboardLayout>
  )
}

export default DeliveryInstructionDetailPage
