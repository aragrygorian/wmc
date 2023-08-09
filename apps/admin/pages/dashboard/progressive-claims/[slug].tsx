import React from 'react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { routes } from '@admin/app/routes'
import Head from 'next/head'
import { NextPage } from 'next'
import {
  DocumentDetailPage,
  DocumentTypeEnum,
  getDocumentTitle,
} from '@gravis-os/apps/accounting'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { useUser } from '@gravis-os/auth'
import { CircularProgress } from '@gravis-os/ui'
import { ProgressiveClaim, ProgressiveClaimLine } from '@prisma/client'
import { omit, pick } from 'lodash'
import ProgressiveClaimFormTemplate from '@admin/modules/ProgressiveClaim/components/ProgressiveClaimFormTemplate'
import { progressiveClaimFormSections } from '@admin/modules/ProgressiveClaim/progressiveClaimConfig'
import progressiveClaimModule from '@admin/modules/ProgressiveClaim/progressiveClaimModule'

import DashboardLayout from '@admin/layouts/DashboardLayout'

const ProgressiveClaimDetailPage: NextPage = () => {
  const { user } = useUser()
  const router = useRouter()
  const { isReady, query } = router
  const { slug } = query
  const isNew = isReady && slug === 'new'
  const { data: count, isFetching } = useQuery({
    queryKey: [progressiveClaimModule.table.name, 'count'],
    queryFn: async () => {
      const { count } = await supabaseClient
        .from(progressiveClaimModule.table.name)
        .select('*', { count: 'exact', head: true })
      return count
    },
    enabled: Boolean(user) && isNew,
  })
  const counter = (count ?? 0) + 1
  const defaultTitle = getDocumentTitle({
    prefix: 'PC',
    counter,
    version: null,
    year: null,
  })

  if (!isReady || isFetching) return <CircularProgress fullScreen />

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: ProgressiveClaim Detail</title>
      </Head>

      <DocumentDetailPage
        type={DocumentTypeEnum.INVOICE}
        module={progressiveClaimModule}
        formSections={progressiveClaimFormSections}
        crudFormProps={{
          formTemplate: ProgressiveClaimFormTemplate,
          useCrudFormProps: {
            afterSubmit: ({ item }) => {
              if (item) {
                const url = `${progressiveClaimModule.route.plural}/${
                  item[progressiveClaimModule.sk]
                }`
                router.push(url, url, { shallow: true })
              }
            },
            defaultValues: { title: defaultTitle, user_id: user },
            setFormValues: ({ item, values, isNew }) => {
              const { title, created_by } = item as ProgressiveClaim
              const { lines } = values
              return {
                ...omit(values, [
                  'retention',
                  'balance_amount',
                  'previous_payment',
                  'contract_sum',
                ]),
                title: isNew ? defaultTitle : title,
                created_by: isNew ? user?.id : created_by,
                updated_by: user?.id,
                lines: lines.map((line) => {
                  return {
                    ...(pick(line, [
                      'id',
                      'position',
                      'quantity',
                      'approved_quantity',
                      'unit_price',
                      'sales_order_line_id',
                      'product_id',
                      'location_code',
                    ]) as ProgressiveClaimLine),
                    created_by: isNew ? user?.id : line.created_by,
                    updated_by: user?.id,
                  }
                }),
              }
            },
          },
        }}
        headerProps={{
          renderButton: () => <div />,
        }}
      />
    </DashboardLayout>
  )
}

export default ProgressiveClaimDetailPage
