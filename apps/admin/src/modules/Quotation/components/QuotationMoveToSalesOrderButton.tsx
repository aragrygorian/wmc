import React from 'react'
import { Button } from '@gravis-os/ui'
import { QUOTATION_STATUS_ACCEPTED } from '@admin/modules/Quotation/constants'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { salesOrderModule } from '@admin/modules/SalesOrder/salesOrderConfig'
import { first, kebabCase, omit } from 'lodash'
import { SalesOrder } from '@prisma/client'
import { routes } from '@admin/app/routes'
import { Quotation } from '@admin/modules/Quotation/types'
import { useCreateMutation } from '@gravis-os/crud'
import { salesOrderLineModule } from '@admin/modules/SalesOrder/salesOrderLineConfig'
import { useMutation, useQueryClient } from 'react-query'
import { OrderForm } from '@admin/modules/OrderForm/types'
import { quotationModule } from '@admin/modules/Quotation/quotationModule'
import { useRouter } from 'next/router'
import useUser from '@admin/app/useUser'
import { getDocumentTitle } from '@gravis-os/apps/accounting'

interface QuotationMoveToSalesOrderButtonProps {
  quotation: Partial<Quotation>
  isNew: boolean
}

const QuotationMoveToSalesOrderButton: React.FC<
  QuotationMoveToSalesOrderButtonProps
> = (props) => {
  const { isNew, quotation } = props

  const queryClient = useQueryClient()
  const router = useRouter()
  const { user } = useUser()

  const updateQuotationMutation = useMutation(
    async ({ id, ...values }: Partial<OrderForm>) =>
      supabaseClient
        .from(quotationModule.table.name)
        .update(values)
        .match({ id }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([quotationModule.table.name]),
    }
  )

  const { createMutation: createSalesOrderMutation } =
    useCreateMutation<SalesOrder>({
      module: salesOrderModule,
    })
  const { createMutation: createSalesOrderLineMutation } = useCreateMutation({
    module: salesOrderLineModule,
  })

  return (
    <Button
      fullWidthOnMobile
      disabled={quotation.status === QUOTATION_STATUS_ACCEPTED}
      variant="contained"
      sx={{ display: isNew ? 'none' : null }}
      onClick={async () => {
        const { count } = await supabaseClient
          .from(salesOrderModule.table.name)
          .select('*', { count: 'exact', head: true })
        const title = getDocumentTitle({
          prefix: 'SO',
          year: null,
          counter: (count ?? 0) + 1,
          version: null,
        })
        const salesOrderInput = {
          ...omit(quotation, [
            // General
            'id',
            'created_at',
            'updated_at',
            'created_by',
            'updated_by',
            'counter',
            'version',
            // Relations
            'assignee',
            'project',
            'company',
            'contact',
            'currency_factor',
            'currency_factor_id',
            'currency_rate',
            'lines',
            'attachment_files',
            'order',
            'order_id',
            'project_brand_discounts',
            'project_product_discounts',
          ]),
          title,
          slug: kebabCase(title),
          assignee_id: quotation.assignee?.id,
          project_id: quotation.project?.id,
          company_id: quotation.company?.id,
          contact_id: quotation.contact?.id,
          quotation_id: quotation?.id,
          created_by: user?.id,
          updated_by: user?.id,
        }
        const { data, error } = await createSalesOrderMutation.mutateAsync(
          salesOrderInput
        )
        const salesOrder: SalesOrder | undefined = first(data)

        if (!salesOrder || error) throw error

        const salesOrderlines = quotation.lines?.map((salesOrderline) => ({
          ...omit(salesOrderline, [
            'id',
            'created_at',
            'updated_at',
            'created_by',
            'updated_by',
            'quotation_id',
            'quotation',
            'product',
            'requested_discount_rate',
          ]),
          sales_order_id: salesOrder.id,
          created_by: user?.id,
          updated_by: user?.id,
        }))
        await Promise.all([
          quotation.status !== QUOTATION_STATUS_ACCEPTED &&
            updateQuotationMutation.mutateAsync({
              id: quotation.id,
              status: QUOTATION_STATUS_ACCEPTED,
            }),
          ...salesOrderlines.map((line) =>
            createSalesOrderLineMutation.mutateAsync(line)
          ),
        ])
        await router.push(routes.SALES_ORDERS.concat(`/${salesOrder.slug}`))
      }}
    >
      Move to Sales Order
    </Button>
  )
}

export default QuotationMoveToSalesOrderButton
