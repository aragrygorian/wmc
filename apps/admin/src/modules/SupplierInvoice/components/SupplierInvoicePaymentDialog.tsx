import React from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@gravis-os/auth'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useQuery, useQueryClient } from 'react-query'
import { useCreateMutation } from '@gravis-os/crud'
import toast from 'react-hot-toast'
import PaymentDialog from 'src/components/PaymentDialog'
import { supplierInvoicePaymentModule } from '../supplierInvoicePaymentConfig'
import { SupplierInvoice } from '../types'
import { supplierInvoiceModule } from '../supplierInvoiceConfig'
import getSupplierInvoiceOutstandingAmount from '../utils/getSupplierInvoiceOutstandingAmount'

const SupplierInvoicePaymentDialog = () => {
  const { user } = useUser()
  const router = useRouter()
  const { isReady, query } = router
  const { slug } = query
  const tableName = supplierInvoiceModule.table.name
  const selector = supplierInvoiceModule.select.detail
  const matcher = { slug }
  const { data: supplierInvoice, refetch } = useQuery({
    queryKey: [tableName, slug],
    queryFn: async () => {
      const { data: supplierInvoice } = await supabaseClient
        .from<SupplierInvoice>(tableName)
        .select(selector)
        .match(matcher)
        .single()
      return supplierInvoice
    },
    enabled: Boolean(user && isReady && slug),
  })
  const outstandingAmount = getSupplierInvoiceOutstandingAmount(supplierInvoice)

  const queryClient = useQueryClient()
  const { createMutation: createSupplierInvoicePaymentMutation } =
    useCreateMutation({
      module: supplierInvoicePaymentModule,
      options: {
        onSuccess: () => {
          refetch()
          queryClient.invalidateQueries([
            supplierInvoicePaymentModule.table.name,
            supplierInvoicePaymentModule.select.list,
            { 'supplier_invoice.slug': slug },
          ])
        },
      },
    })

  const onSubmit =
    ({ onSuccess }) =>
    async (values) => {
      try {
        const { error } =
          await createSupplierInvoicePaymentMutation.mutateAsync({
            ...values,
            created_by: user?.id,
            updated_by: user?.id,
            supplier_invoice_id: supplierInvoice?.id,
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

export default SupplierInvoicePaymentDialog
