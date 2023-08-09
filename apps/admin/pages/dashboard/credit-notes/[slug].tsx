import React from 'react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import Head from 'next/head'
import { NextPage } from 'next'
import {
  DocumentDetailPage,
  DocumentTypeEnum,
  getDocumentTitle,
} from '@gravis-os/apps/accounting'
import { Alert, CircularProgress, Container } from '@gravis-os/ui'
import { useUser } from '@gravis-os/auth'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { CreditNote } from '@prisma/client'
import { pick } from 'lodash'
import {
  creditNoteFormSections,
  creditNoteModule,
} from '@admin/modules/CreditNote/creditNoteConfig'
import DashboardLayout from '@admin/layouts/DashboardLayout'

const CreditNoteDetailPage: NextPage = () => {
  const { user } = useUser()
  const router = useRouter()
  const { isReady, query } = router
  const { slug } = query
  const isNew = isReady && slug === 'new'
  const { data: count, isFetching } = useQuery({
    queryKey: [creditNoteModule.table.name, 'count'],
    queryFn: async () => {
      const { count } = await supabaseClient
        .from(creditNoteModule.table.name)
        .select('*', { count: 'exact', head: true })
      return count
    },
    enabled: Boolean(user) && isNew,
  })
  const counter = (count ?? 0) + 1
  const defaultTitle = getDocumentTitle({
    prefix: 'CN',
    counter,
    version: null,
    year: null,
  })

  if (!isReady || isFetching) return <CircularProgress fullScreen />

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Credit Note Detail</title>
      </Head>

      <Container sx={{ mb: 2 }}>
        <Alert severity="warning">
          Under Construction. Unavailable for testing.
        </Alert>
      </Container>

      <DocumentDetailPage
        type={DocumentTypeEnum.CREDIT_NOTE}
        module={creditNoteModule}
        formSections={creditNoteFormSections}
        headerProps={{
          button: <div />,
        }}
        crudFormProps={{
          disableRedirectOnSuccess: false,
          useCrudFormProps: {
            defaultValues: { title: defaultTitle, user_id: user?.id },
            setFormValues: ({ item, values, isNew }) => {
              const { title, created_by: createdBy } = item as CreditNote
              const { lines } = values
              return {
                ...values,
                title: isNew ? defaultTitle : title,
                created_by: isNew ? user?.id : createdBy,
                updated_by: user?.id,
                lines: lines.map((line) => ({
                  ...pick(line, [
                    'id',
                    'position',
                    'title',
                    'description',
                    'location_code',
                    'discount_rate',
                    'note',
                    'quantity',
                    'unit_price',
                    'subtotal',
                    'total',
                    'credit_note_id',
                    'product_id',
                    'invoice_line_id',
                  ]),
                  created_by: line.created_by ?? user?.id,
                  updated_by: user?.id,
                })),
              }
            },
            afterSubmit: ({ item }) => {
              if (item) {
                const url = `${creditNoteModule.route.plural}/${
                  item[creditNoteModule.sk]
                }`
                router.push(url, url, { shallow: true })
              }
            },
          },
        }}
      />
    </DashboardLayout>
  )
}

export default CreditNoteDetailPage
