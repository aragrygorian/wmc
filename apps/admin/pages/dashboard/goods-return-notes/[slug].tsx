import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import {
  DocumentDetailPage,
  DocumentTypeEnum,
} from '@gravis-os/apps/accounting'
import { Alert, Container } from '@gravis-os/ui'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  goodsReturnNoteFormSections,
  goodsReturnNoteModule,
} from '@admin/modules/GoodsReturnNote/goodsReturnNoteConfig'
import { useRouter } from 'next/router'

const GoodsReturnNoteDetailPage: NextPage = () => {
  const router = useRouter()

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Goods Return Note Detail</title>
      </Head>

      <Container sx={{ mb: 2 }}>
        <Alert severity="warning">
          Under Construction. Unavailable for testing.
        </Alert>
      </Container>

      <DocumentDetailPage
        type={DocumentTypeEnum.GOODS_RETURN_NOTE}
        module={goodsReturnNoteModule}
        formSections={goodsReturnNoteFormSections}
        crudFormProps={{
          useCrudFormProps: {
            defaultValues: { title: '-' },
            afterSubmit: ({ item }) => {
              if (item?.id) {
                router.push(
                  `${goodsReturnNoteModule.route.plural}/${
                    item?.[goodsReturnNoteModule.sk]
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

export default GoodsReturnNoteDetailPage
