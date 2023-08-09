import React from 'react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import {
  DocumentDetailPage,
  DocumentTypeEnum,
  getDocumentTitle,
} from '@gravis-os/apps/accounting'
import { CircularProgress } from '@gravis-os/ui'
import useUser from '@admin/app/useUser'
import { groupBy, kebabCase, pick } from 'lodash'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import { printIsoDate } from '@gravis-os/utils'
import usePdfPrint from '@admin/hooks/usePdfPrint'
import { warehouseProductModule } from '../../Warehouse/warehouseProductConfig'
import { orderFormModule } from '../../OrderForm/orderFormConfig'
import { getPurchaseOrderLineFromOrderFormLine } from '../utils'
import { PurchaseOrder } from '../types'
import {
  purchaseOrderFormSchema,
  purchaseOrderFormSections,
} from '../purchaseOrderConfig'
import purchaseOrderModule from '../purchaseOrderModule'
import { OrderForm } from '../../OrderForm/types'

const MAX_ROW_TO_FIT_PAGE = 2

const PurchaseOrderGeneralTab: React.FC = (props) => {
  const { item } = props as any
  const { isPrintMode, handlePrint } = usePdfPrint()
  const { user } = useUser()
  const router = useRouter()
  const { isReady, query } = router
  const { 'order-form': order_form_id, slug } = query
  const isNew = slug === 'new'
  const { data: orderForm, isFetching: isFetchingOrderForm } = useQuery({
    queryKey: [
      orderFormModule.table.name,
      orderFormModule.select.detail,
      order_form_id,
    ],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from<OrderForm>(orderFormModule.table.name)
        .select(orderFormModule.select.detail)
        .match({ id: order_form_id })
        .maybeSingle()
      return data
    },
    enabled: Boolean(user && order_form_id),
  })
  const { data: count, isFetching: isFetchingCount } = useQuery({
    queryKey: [purchaseOrderModule.table.name, 'count'],
    queryFn: async () => {
      const { count } = await supabaseClient
        .from(purchaseOrderModule.table.name)
        .select('*', { count: 'exact', head: true })
      return count
    },
    enabled: Boolean(user) && isNew,
  })
  const counter = (count ?? 0) + 1
  const defaultTitle = getDocumentTitle({
    prefix: 'PO',
    counter,
    version: null,
  })
  const isFetching = isFetchingOrderForm || isFetchingCount
  const { company: supplier, lines: orderFormLines } = orderForm || {}
  const purchaseOrderLines = orderFormLines
    ?.filter(({ purchase_order_line }) => !purchase_order_line?.length)
    .map(getPurchaseOrderLineFromOrderFormLine)

  const shouldPushToNewPage = item?.lines?.length <= MAX_ROW_TO_FIT_PAGE

  if (!isReady || isFetching) return <CircularProgress fullScreen />

  return (
    <DocumentDetailPage
      type={DocumentTypeEnum.PURCHASE_ORDER}
      module={purchaseOrderModule}
      formSections={purchaseOrderFormSections}
      containerProps={{ disableGutters: true }}
      crudFormProps={{
        disableHeader: true,
        useCrudFormProps: {
          defaultValues: {
            title: defaultTitle,
            company_id: supplier,
            lines: purchaseOrderLines,
          },
          setFormValues: ({ item, values, isNew }) => {
            const { title, slug } = item as PurchaseOrder
            const {
              lines,
              created_by,
              ready_at,
              shipped_at,
              arrived_at,
              ...rest
            } = values
            const nextLines = lines.map(({ created_by, ...rest }) => ({
              ...pick(rest, [
                'id',
                'position',
                'note',
                'quantity',
                'unit_price',
                'purchase_order_id',
                'product_id',
                'order_form_line_id',
              ]),
              created_by: isNew ? user?.id : created_by,
              updated_by: user?.id,
            }))
            const nextTitle = isNew ? defaultTitle : title
            const nextSlug = isNew ? kebabCase(nextTitle) : slug
            return {
              ...pick(rest, [
                'id',
                'status',
                'ship_via',
                'shipping_address_line_1',
                'shipping_address_line_2',
                'shipping_address_postal_code',
                'shipping_address_city',
                'shipping_address_country',
                'external_notes',
                'internal_notes',
                'currency_rate',
                'subtotal',
                'discount_rate',
                'discount',
                'is_discount_rate',
                'shipping',
                'tax',
                'total',
                'assignee_id',
                'company_id',
                'contact_id',
                'warehouse_id',
                'currency_factor_id',
              ]),
              title: nextTitle,
              slug: nextSlug,
              lines: nextLines,
              ready_at: printIsoDate(ready_at),
              shipped_at: printIsoDate(shipped_at),
              arrived_at: printIsoDate(arrived_at),
              created_by: isNew ? user?.id : created_by,
              updated_by: user?.id,
            }
          },
          async afterSubmit({ rawValues, item }) {
            const { warehouse, lines } = rawValues
            const productIds = Object.keys(groupBy(lines, 'product_id'))
            const { data: warehouseProducts } = await supabaseClient
              .from(warehouseProductModule.table.name)
              .select('*')
              .match({ warehouse_id: warehouse.id })
              .in('product_id', productIds)
            // TODO: move into db trigger
            await Promise.all(
              productIds.map((productId) => {
                const warehouseProduct = warehouseProducts?.find(
                  ({ product_id }) => Number(productId) === product_id
                )
                if (warehouseProduct) return warehouseProduct
                return supabaseClient
                  .from(warehouseProductModule.table.name)
                  .insert({
                    warehouse_id: warehouse.id,
                    product_id: productId,
                    created_by: user?.id,
                    updated_by: user?.id,
                  })
              })
            )
            if (item) {
              const url = `${purchaseOrderModule.route.plural}/${
                item[purchaseOrderModule.sk]
              }`
              router.push(url, url, { shallow: true })
            }
          },
          resolver: yupResolver(purchaseOrderFormSchema),
        },
        formTemplateProps: {
          onPrint: () =>
            handlePrint({
              filename: item?.title && `${item.slug.toUpperCase()}.pdf`,
            }),
          printMode: isPrintMode,
          printModeOptions: { pageBreak: shouldPushToNewPage },
        },
      }}
    />
  )
}

export default PurchaseOrderGeneralTab
