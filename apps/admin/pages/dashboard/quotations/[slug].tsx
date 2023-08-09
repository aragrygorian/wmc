import { routes } from '@admin/app/routes'
import useUser from '@admin/app/useUser'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import { OrderForm } from '@admin/modules/OrderForm/types'
import QuotationDiscountApprovalDialogButton from '@admin/modules/Quotation/components/QuotationDiscountApprovalDialogButton'
import QuotationFormTemplate from '@admin/modules/Quotation/components/QuotationFormTemplate'
import QuotationMoveToSalesOrderButton from '@admin/modules/Quotation/components/QuotationMoveToSalesOrderButton'
import {
  QuotationType,
  QUOTATION_STATUS_ACCEPTED,
} from '@admin/modules/Quotation/constants'
import { useIsAuthorised } from '@admin/modules/Quotation/hooks/useIsAuthorised'
import {
  ironmongeryQuotationFormSections,
  quotationFormSchema,
  quotationFormSections,
} from '@admin/modules/Quotation/quotationConfig'
import { quotationModule } from '@admin/modules/Quotation/quotationModule'
import { Quotation } from '@admin/modules/Quotation/types'
import { getNetUnitPriceFromLine } from '@admin/modules/Quotation/utils'
import { salesOrderModule } from '@admin/modules/SalesOrder/salesOrderConfig'
import {
  DocumentDetailPage,
  DocumentTypeEnum,
  getDocumentTitle,
} from '@gravis-os/apps/accounting'
import { useCreateMutation } from '@gravis-os/crud'
import {
  Alert,
  Button,
  Container,
  SplitButton,
  Typography,
} from '@gravis-os/ui'
import { yupResolver } from '@hookform/resolvers/yup'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import { SalesOrder } from '@prisma/client'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { assign, first, isEqual, kebabCase, omit, set } from 'lodash'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { salesOrderLineModule } from 'src/modules/SalesOrder/salesOrderLineConfig'
import usePdfPrint from '../../../src/hooks/usePdfPrint'

const QuotationDetailPage: NextPage = () => {
  /* Router */
  const router = useRouter()
  const { canRequestDiscount } = useIsAuthorised()

  /* Query */
  const queryClient = useQueryClient()
  const { query } = router
  const { type: queryType } = query

  /* User */
  const { user } = useUser()

  /* Update */
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

  /* Render */
  const { isPrintMode } = usePdfPrint()
  const renderButton = ({ formContext: { getValues }, isNew }) => {
    const quotation = getValues() || {}

    return (
      <Button
        disabled={quotation.status === QUOTATION_STATUS_ACCEPTED}
        variant="contained"
        endIcon={<ArrowRightAltOutlinedIcon />}
        fullWidthOnMobile
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

  const detailPageJSX = (
    <DocumentDetailPage
      type={DocumentTypeEnum.QUOTATION}
      // Edit quotation module to include both quotation types
      module={
        isEqual(queryType, QuotationType.IronMongery)
          ? set(quotationModule, 'name.singular', `IronMongery Quotation`)
          : quotationModule
      }
      formSections={
        isEqual(queryType, QuotationType.IronMongery)
          ? ironmongeryQuotationFormSections
          : quotationFormSections
      }
      crudFormProps={{
        formTemplate: QuotationFormTemplate,
        useCrudFormProps: {
          afterSubmit: (props) => {
            const { item } = props
            const { slug } = item as Quotation

            router.push(`${quotationModule.route.plural}/${slug}`)
          },
          setFormValues: (props) => {
            const { item, values } = props
            const { counter } = item as Quotation
            const { lines } = values || []

            const nextLines = lines
              .filter(({ product_id: productId }) => productId) // filter untouched lines
              .map((line) => ({
                ...omit(line, 'id'),
                unit_price: line?.unit_price
                  ? line.unit_price
                  : getNetUnitPriceFromLine(line),
              }))

            return { ...omit(values, 'id'), counter, lines: nextLines }
          },
          createOnSubmit: true,
          defaultValues: { title: '-' },
          resolver: yupResolver(quotationFormSchema),
        },
        disableHeader: isPrintMode,
      }}
      headerProps={{
        disableBreadcrumbs: isPrintMode,
        // undefined is used due to the typing doesn't accept null
        renderButton: isPrintMode
          ? undefined
          : ({ formContext: { getValues }, isNew }) => {
              const quotation = getValues() as Quotation
              const hasActiveDiscountRequest = quotation.lines?.some((line) =>
                Boolean(line.requested_discount_rate)
              )

              const options = [
                {
                  label: 'Move to Sales Order',
                  value: 'MOVE_TO_SALES_ORDER',
                  render: () => (
                    <QuotationMoveToSalesOrderButton
                      isNew={isNew}
                      quotation={quotation}
                    />
                  ),
                },
                {
                  label: 'Submit for Approval',
                  value: 'SUBMIT_FOR_APPROVAL',
                  disabled:
                    isNew || !canRequestDiscount || !hasActiveDiscountRequest,
                  render: () => (
                    <QuotationDiscountApprovalDialogButton
                      quotation={quotation}
                    />
                  ),
                },
              ]

              return <SplitButton options={options} />
            },
      }}
    />
  )

  if (isPrintMode) return detailPageJSX

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Quotation Detail</title>
      </Head>

      <Container sx={{ mb: 2 }}>
        <Alert severity="warning">
          Under Construction. Unavailable for testing.
        </Alert>
      </Container>

      {detailPageJSX}
    </DashboardLayout>
  )
}

export default QuotationDetailPage
