import React from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@gravis-os/auth'
import { useQuery } from 'react-query'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { supplierInvoicePaymentModule } from '../supplierInvoicePaymentConfig'
import { SupplierInvoicePayment } from '../types'
import PaymentHistoryDialog from '../../../components/PaymentHistoryDialog'

const SupplierInvoicePaymentHistoryDialog = () => {
  const { user } = useUser()
  const router = useRouter()
  const { isReady, query } = router
  const { slug } = query
  const tableName = supplierInvoicePaymentModule.table.name
  const selector = supplierInvoicePaymentModule.select.list
  const matcher = { 'supplier_invoice.slug': slug }
  const { data: supplierInvoicePayments = [] } = useQuery({
    queryKey: [tableName, selector, matcher],
    queryFn: async () => {
      const { data: supplierInvoicePayments } = await supabaseClient
        .from<SupplierInvoicePayment>(tableName)
        .select(selector)
        .match(matcher)
      return supplierInvoicePayments
    },
    enabled: Boolean(user && isReady && slug),
  })

  return <PaymentHistoryDialog payments={supplierInvoicePayments} />
}

export default SupplierInvoicePaymentHistoryDialog
