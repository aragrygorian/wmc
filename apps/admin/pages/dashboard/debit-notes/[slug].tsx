import React from 'react'

import { routes } from '@admin/app/routes'
import Head from 'next/head'
import { NextPage } from 'next'
import {
  DocumentDetailPage,
  DocumentTypeEnum,
} from '@gravis-os/apps/accounting'
import { Alert, Container } from '@gravis-os/ui'
import { useRouter } from 'next/router'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  debitNoteFormSections,
  debitNoteModule,
} from '@admin/modules/DebitNote/debitNoteConfig'

const DebitNoteDetailPage: NextPage = () => {
  const router = useRouter()

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Debit Note Detail</title>
      </Head>

      <Container sx={{ mb: 2 }}>
        <Alert severity="warning">
          Under Construction. Unavailable for testing.
        </Alert>
      </Container>

      <DocumentDetailPage
        type={DocumentTypeEnum.DEBIT_NOTE}
        module={debitNoteModule}
        formSections={debitNoteFormSections}
        crudFormProps={{
          useCrudFormProps: {
            defaultValues: { title: '-' },
            afterSubmit: ({ item }) => {
              if (item?.id) {
                router.push(
                  `${debitNoteModule.route.plural}/${
                    item?.[debitNoteModule.sk]
                  }`
                )
              }
            },
          },
        }}
      />
    </DashboardLayout>
  )
}

export default DebitNoteDetailPage
