import React, { useState } from 'react'
import GoodsReturnNoteLinesAddDialog from '@admin/modules/GoodsReturnNote/components/GoodsReturnNoteAddDialog'
import { Invoice, InvoiceLine } from '@admin/modules/Invoice/types'
import {
  GoodsReturnNote,
  GoodsReturnNoteLine,
} from '@admin/modules/GoodsReturnNote/types'
import { first, pick } from 'lodash'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useCreateMutation } from '@gravis-os/crud'
import { goodsReturnNoteModule } from '@admin/modules/GoodsReturnNote/goodsReturnNoteConfig'
import { goodsReturnNoteLineModule } from '@admin/modules/GoodsReturnNote/goodsReturnNoteLineConfig'
import { useUser } from '@gravis-os/auth'
import { GOODS_RETURN_NOTE_STATUS_PENDING } from '@admin/modules/GoodsReturnNote/constants'

interface GoodsReturnNoteAddDialogProps {
  invoice: Invoice
}

const GoodsReturnNoteAddDialog: React.FC<GoodsReturnNoteAddDialogProps> = (
  props
) => {
  const { invoice } = props

  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const { user } = useUser()

  const { createMutation: createGoodsReturnNoteMutation } =
    useCreateMutation<GoodsReturnNote>({ module: goodsReturnNoteModule })

  const { createMutation: createGoodsReturnNoteLineMutation } =
    useCreateMutation<GoodsReturnNoteLine>({
      module: goodsReturnNoteLineModule,
    })

  const createGoodsReturnNote = async (lines: Partial<InvoiceLine>[]) => {
    if (!lines.length) return

    try {
      setIsSubmitting(true)

      const { data } = await createGoodsReturnNoteMutation.mutateAsync({
        created_by: user?.id,
        updated_by: user?.id,
        invoice_id: invoice?.id,
        status: GOODS_RETURN_NOTE_STATUS_PENDING,
        ...pick(invoice, ['company_id', 'contact_id', 'project_id']),
      })

      const goodsReturnNote = first(data)

      await Promise.all(
        lines.map((line) =>
          createGoodsReturnNoteLineMutation.mutateAsync({
            ...pick(line, ['location_code', 'quantity', 'product_id', 'note']),
            slug: line?.product?.slug,
            title: line?.product?.title,
            invoice_line_id: line.id,
            created_by: user?.id,
            updated_by: user?.id,
            goods_return_note_id: goodsReturnNote?.id,
          })
        )
      )

      if (goodsReturnNote) {
        toast.success('Success')

        const url = `${goodsReturnNoteModule.route.plural}/${
          goodsReturnNote[goodsReturnNoteModule.sk]
        }`

        router.push(url)
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <GoodsReturnNoteLinesAddDialog
      dialogButtonProps={{
        title: 'Add Goods Return Note',
        actionButtonProps: { disabled: isSubmitting },
      }}
      invoice={invoice}
      onAddLines={createGoodsReturnNote}
    />
  )
}

export default GoodsReturnNoteAddDialog
