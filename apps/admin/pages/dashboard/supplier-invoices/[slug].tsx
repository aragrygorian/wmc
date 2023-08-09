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
import SupplierInvoicePaymentHistoryDialog from 'src/modules/SupplierInvoice/components/SupplierInvoicePaymentHistoryDialog'
import SupplierInvoicePaymentDialog from 'src/modules/SupplierInvoice/components/SupplierInvoicePaymentDialog'
import { SUPPLIER_INVOICE_USER_TYPE_ASSIGNEE } from '@admin/modules/SupplierInvoice/constants'
import {
  supplierInvoiceFormSections,
  supplierInvoiceModule,
} from '@admin/modules/SupplierInvoice/supplierInvoiceConfig'
import { SupplierInvoice } from '@admin/modules/SupplierInvoice/types'
import DashboardLayout from '@admin/layouts/DashboardLayout'

const SupplierInvoiceDetailPage: NextPage = () => {
  const { user } = useUser()
  const router = useRouter()
  const { isReady, query } = router
  const { slug } = query
  const isNew = isReady && slug === 'new'
  const { data: count, isFetching } = useQuery({
    queryKey: [supplierInvoiceModule.table.name, 'count'],
    queryFn: async () => {
      const { count } = await supabaseClient
        .from(supplierInvoiceModule.table.name)
        .select('*', { count: 'exact', head: true })
      return count
    },
    enabled: Boolean(user) && isNew,
  })
  const counter = (count ?? 0) + 1
  const defaultTitle = getDocumentTitle({
    prefix: 'SIN',
    counter,
    version: null,
    year: null,
  })

  if (!isReady || isFetching) return <CircularProgress fullScreen />

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Supplier Invoice Detail</title>
      </Head>

      <Container sx={{ mb: 2 }}>
        <Alert severity="warning">
          Under Construction. Unavailable for testing.
        </Alert>
      </Container>

      <DocumentDetailPage
        type={DocumentTypeEnum.SUPPLIER_INVOICE}
        module={supplierInvoiceModule}
        formSections={supplierInvoiceFormSections}
        headerProps={{
          button: isNew ? <div /> : <SupplierInvoicePaymentDialog />,
        }}
        crudFormProps={{
          disableRedirectOnSuccess: false,
          formTemplateProps: {
            actionButtons: [<SupplierInvoicePaymentHistoryDialog />],
          },
          useCrudFormProps: {
            defaultValues: {
              title: defaultTitle,
              salesperson_id: [
                { ...user, type: SUPPLIER_INVOICE_USER_TYPE_ASSIGNEE },
              ],
            },
            setFormValues: ({ item, values, isNew }) => {
              const { title, created_by } = item as SupplierInvoice
              return {
                ...values,
                title: isNew ? defaultTitle : title,
                created_by: isNew ? user?.id : created_by,
                updated_by: user?.id,
              }
            },
            afterSubmit: ({ item }) => {
              if (item) {
                const url = `${supplierInvoiceModule.route.plural}/${
                  item[supplierInvoiceModule.sk]
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

export default SupplierInvoiceDetailPage
