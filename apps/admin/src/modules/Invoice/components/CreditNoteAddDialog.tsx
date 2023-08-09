import React, { useState } from 'react'
import { DataTable, useCreateMutation } from '@gravis-os/crud'
import { printAmount } from '@gravis-os/utils'
import { Box } from '@mui/material'
import { useWatch } from 'react-hook-form'
import { creditNoteModule } from 'src/modules/CreditNote/creditNoteConfig'
import { useUser } from '@gravis-os/auth'
import { creditNoteLineModule } from 'src/modules/CreditNote/creditNoteLineConfig'
import { useQuery } from 'react-query'
import { first, kebabCase, pick, sumBy } from 'lodash'
import { CreditNote, CreditNoteLine } from '@prisma/client'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { getDocumentTitle } from '@gravis-os/apps/accounting'
import Router from 'next/router'
import toast from 'react-hot-toast'
import DialogButton from '../../../components/DialogButton'
import TextEditor from '../../../components/editors/TextEditor'
import { InvoiceLine } from '../types'
import getLineTotal from '../../../utils/getLineTotal'

const columnDefs = [
  { field: 'product.model_code', headerName: 'Model Code' },
  { field: 'product.title', headerName: 'Product Name' },
  { field: 'quantity', headerName: 'Qty' },
  {
    field: 'unit_price',
    headerName: 'Unit Price ($)',
    valueFormatter: ({ value }) => printAmount(value),
  },
  {
    field: 'total',
    valueGetter: ({ data }) => data.unit_price * data.quantity,
    valueFormatter: ({ value }) => printAmount(value),
  },
  {
    field: 'quantity_to_move',
    headerName: 'Qty to Move',
    editable: true,
    cellEditor: TextEditor,
    cellRenderer: TextEditor,
    cellStyle: { padding: 0, height: '100%' },
  },
]

const CreditNoteAddDialog: React.FC = () => {
  const { user } = useUser()
  const [
    lines,
    invoice_id,
    project,
    company,
    contact,
    billing_address_line_1,
    billing_address_line_2,
    billing_address_postal_code,
    billing_address_city,
    billing_address_country,
  ] = useWatch({
    name: [
      'lines',
      'id',
      'project_id',
      'company_id',
      'contact_id',
      'billing_address_line_1',
      'billing_address_line_2',
      'billing_address_postal_code',
      'billing_address_city',
      'billing_address_country',
    ],
  })
  const rowData = lines?.filter(({ product }) => product)
  const { data: count } = useQuery({
    queryKey: [creditNoteModule.table.name, 'count'],
    queryFn: async () => {
      const { count } = await supabaseClient
        .from(creditNoteModule.table.name)
        .select('*', { count: 'exact', head: true })
      return count
    },
    enabled: Boolean(user),
  })
  const counter = (count ?? 0) + 1
  const defaultTitle = getDocumentTitle({
    prefix: 'CN',
    counter,
    version: null,
    year: null,
  })

  const { createMutation: createCreditNoteMutation } =
    useCreateMutation<CreditNote>({ module: creditNoteModule })
  const { createMutation: createCreditNoteLineMutation } =
    useCreateMutation<CreditNoteLine>({
      module: creditNoteLineModule,
    })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleCreateCreditNote = async () => {
    try {
      setIsSubmitting(true)
      const { data } = await createCreditNoteMutation.mutateAsync({
        created_by: user?.id,
        updated_by: user?.id,
        title: defaultTitle,
        slug: kebabCase(defaultTitle),
        total: sumBy(rowData, getLineTotal),
        user_id: user?.id,
        project_id: project?.id,
        company_id: company?.id,
        contact_id: contact?.id,
        invoice_id,
        billing_address_line_1,
        billing_address_line_2,
        billing_address_postal_code,
        billing_address_city,
        billing_address_country,
      })
      const creditNote = first(data)
      await Promise.all(
        rowData.map((line: InvoiceLine & { quantity_to_move?: number }) => {
          const { id, quantity_to_move } = line
          return createCreditNoteLineMutation.mutateAsync({
            ...pick(line, ['position', 'note', 'unit_price', 'product_id']),
            quantity: quantity_to_move,
            credit_note_id: creditNote?.id,
            invoice_line_id: id,
            created_by: user?.id,
            updated_by: user?.id,
          })
        })
      )
      if (creditNote) {
        toast.success('Success')
        const url = `${creditNoteModule.route.plural}/${
          creditNote[creditNoteModule.sk]
        }`
        Router.push(url, url, { shallow: true })
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DialogButton
      title="Add Credit Note"
      actionButtonProps={{
        children: 'Create',
        onClick: handleCreateCreditNote,
        disabled: isSubmitting,
      }}
    >
      <Box sx={{ mt: -2.5 }}>
        <DataTable rowData={rowData} columnDefs={columnDefs} singleClickEdit />
      </Box>
    </DialogButton>
  )
}

export default CreditNoteAddDialog
