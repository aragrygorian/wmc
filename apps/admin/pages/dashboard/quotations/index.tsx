import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  quotationColumnDefs,
  quotationFilterFormSections,
  quotationPreviewFormSections,
} from '@admin/modules/Quotation/quotationConfig'
import { ListPage } from '@gravis-os/crud'
import { quotationModule } from '@admin/modules/Quotation/quotationModule'
import QuotationTypeDialog from '../../../src/modules/Quotation/components/QuotationTypeDialog'

const QuotationListPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Quotation List</title>
      </Head>

      <ListPage
        module={quotationModule}
        columnDefs={quotationColumnDefs}
        previewFormSections={quotationPreviewFormSections}
        filterFormSections={quotationFilterFormSections}
        crudTableProps={{
          disablePreview: true,
          headerProps: {
            renderAddButton: () => <QuotationTypeDialog />,
          },
        }}
      />
    </DashboardLayout>
  )
}

export default QuotationListPage
