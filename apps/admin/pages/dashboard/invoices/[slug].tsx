import React from 'react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import Head from 'next/head'
import { NextPage } from 'next'
import {
  DocumentDetailPage,
  DocumentTypeEnum,
  getDocumentTitle,
} from '@gravis-os/apps/accounting'
import { Alert, CircularProgress, Container, SplitButton } from '@gravis-os/ui'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { useUser } from '@gravis-os/auth'
import { first, noop, omit, pick } from 'lodash'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import { invoiceFormSections } from '@admin/modules/Invoice/invoiceConfig'
import invoiceModule from '@admin/modules/Invoice/invoiceModule'
import InvoicePaymentDialog from '@admin/modules/Invoice/components/InvoicePaymentDialog'
import InvoicePaymentHistoryDialog from '@admin/modules/Invoice/components/InvoicePaymentHistoryDialog'
import { SUPPLIER_INVOICE_USER_TYPE_ASSIGNEE } from '@admin/modules/SupplierInvoice/constants'
import { Invoice } from '@admin/modules/Invoice/types'
import { InvoiceType } from '@admin/modules/Invoice/constants'
import CreditNoteAddDialog from '@admin/modules/Invoice/components/CreditNoteAddDialog'
import { useFetchInvoices } from '@admin/modules/Invoice/hooks/useFetchInvoices'
import GoodsReturnNoteAddDialog from '@admin/modules/Invoice/components/GoodsReturnNoteAddDialog'

const InvoiceDetailPage: NextPage = () => {
  const { user } = useUser()
  const router = useRouter()
  const { isReady, query } = router
  const { slug, type } = query
  const isNew = isReady && slug === 'new'
  const { data: count, isFetching } = useQuery({
    queryKey: [invoiceModule.table.name, 'count'],
    queryFn: async () => {
      const { count } = await supabaseClient
        .from(invoiceModule.table.name)
        .select('*', { count: 'exact', head: true })
      return count
    },
    enabled: Boolean(user) && isNew,
  })

  const { data: invoices } = useFetchInvoices({ match: { slug } })
  const invoice = first(invoices) || ({} as Invoice)

  const counter = (count ?? 0) + 1
  const defaultTitle = getDocumentTitle({
    prefix: 'INV',
    counter,
    version: null,
    year: null,
  })

  const options = [
    {
      label: 'Credit Note',
      value: 'CREDIT_NOTE',
      render: () => <CreditNoteAddDialog />,
    },
    {
      label: 'Goods Return Note',
      value: 'GOODS_RETURN_NOTE',
      render: () => <GoodsReturnNoteAddDialog invoice={invoice} />,
      disabled: invoice?.type !== InvoiceType.Itemised,
    },
  ]

  if (!isReady || isFetching) return <CircularProgress fullScreen />

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Invoice Detail</title>
      </Head>

      <Container sx={{ mb: 2 }}>
        <Alert severity="warning">
          Under Construction. Unavailable for testing.
        </Alert>
      </Container>

      <DocumentDetailPage
        type={DocumentTypeEnum.INVOICE}
        module={invoiceModule}
        formSections={invoiceFormSections}
        headerProps={{
          button: isNew ? <div /> : <InvoicePaymentDialog />,
          actions: !isNew && <SplitButton options={options} onClick={noop} />,
        }}
        crudFormProps={{
          formTemplateProps: {
            actionButtons: [<InvoicePaymentHistoryDialog />],
          },
          useCrudFormProps: {
            afterSubmit: ({ item }) => {
              if (item) {
                const url = `${invoiceModule.route.plural}/${
                  item[invoiceModule.sk]
                }`
                router.push(url, url, { shallow: true })
              }
            },
            defaultValues: {
              title: defaultTitle,
              salesperson_id: [
                { ...user, type: SUPPLIER_INVOICE_USER_TYPE_ASSIGNEE },
              ],
              type,
            },
            setFormValues: ({ item, values, isNew }) => {
              const { title, created_by } = item as Invoice
              const { lines, type } = values
              const isLumpSumType = type === InvoiceType.LumpSum
              const nextLines = lines
                .map((line) => ({
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
                    'invoice_id',
                    'product_id',
                  ]),
                  created_by: line.created_by ?? user?.id,
                  updated_by: user?.id,
                }))
                .filter(({ title }) => !isLumpSumType || title)
              return {
                ...omit(values, ['credit_note', 'payments']),
                title: isNew ? defaultTitle : title,
                created_by: isNew ? user?.id : created_by,
                updated_by: user?.id,
                lines: nextLines,
              }
            },
          },
        }}
      />
    </DashboardLayout>
  )
}

export default InvoiceDetailPage
