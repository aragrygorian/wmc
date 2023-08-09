import React from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@gravis-os/auth'
import { useQuery } from 'react-query'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import PaymentHistoryDialog from 'src/components/PaymentHistoryDialog'
import { invoicePaymentModule } from '../invoicePaymentConfig'
import { InvoicePayment } from '../types'

const InvoicePaymentHistoryDialog = () => {
  const { user } = useUser()
  const router = useRouter()
  const { isReady, query } = router
  const { slug } = query
  const tableName = invoicePaymentModule.table.name
  const selector = invoicePaymentModule.select.list
  const matcher = { 'invoice.slug': slug }
  const { data: invoicePayments = [] } = useQuery({
    queryKey: [tableName, selector, matcher],
    queryFn: async () => {
      const { data: invoicePayments } = await supabaseClient
        .from<InvoicePayment>(tableName)
        .select(selector)
        .match(matcher)
      return invoicePayments
    },
    enabled: Boolean(user && isReady && slug),
  })

  return <PaymentHistoryDialog payments={invoicePayments} />
}

export default InvoicePaymentHistoryDialog
