import React from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@gravis-os/auth'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useQuery, useQueryClient } from 'react-query'
import { useCreateMutation } from '@gravis-os/crud'
import toast from 'react-hot-toast'
import PaymentDialog from 'src/components/PaymentDialog'
import { invoicePaymentModule } from '../invoicePaymentConfig'
import { Invoice } from '../types'
import invoiceModule from '../invoiceModule'
import getInvoiceOutstandingAmount from '../utils/getInvoiceOutstandingAmount'

const InvoicePaymentDialog = () => {
  const { user } = useUser()
  const router = useRouter()
  const { isReady, query } = router
  const { slug } = query
  const tableName = invoiceModule.table.name
  const selector = invoiceModule.select.detail
  const matcher = { slug }
  const { data: invoice, refetch } = useQuery({
    queryKey: [tableName, slug],
    queryFn: async () => {
      const { data: invoice } = await supabaseClient
        .from<Invoice>(tableName)
        .select(selector)
        .match(matcher)
        .single()
      return invoice
    },
    enabled: Boolean(user && isReady && slug),
  })
  const outstandingAmount = getInvoiceOutstandingAmount(invoice)

  const queryClient = useQueryClient()
  const { createMutation: createInvoicePaymentMutation } = useCreateMutation({
    module: invoicePaymentModule,
    options: {
      onSuccess: () => {
        refetch()
        queryClient.invalidateQueries([
          invoicePaymentModule.table.name,
          invoicePaymentModule.select.list,
          { 'invoice.slug': slug },
        ])
      },
    },
  })

  const onSubmit =
    ({ onSuccess }) =>
    async (values) => {
      try {
        const { error } = await createInvoicePaymentMutation.mutateAsync({
          ...values,
          created_by: user?.id,
          updated_by: user?.id,
          invoice_id: invoice?.id,
        })
        if (!error) {
          onSuccess()
          toast.success('Success')
        }
      } catch (error) {
        toast.error('Something went wrong')
        console.error(error)
      }
    }

  return (
    <PaymentDialog outstandingAmount={outstandingAmount} onSubmit={onSubmit} />
  )
}

export default InvoicePaymentDialog
