import React from 'react'
import {
  DocumentDetailPage,
  DocumentTypeEnum,
} from '@gravis-os/apps/accounting'
import { CrudTable } from '@gravis-os/crud'
import dayjs from 'dayjs'
import { omit, uniq } from 'lodash'
import StatusCell from '@admin/components/StatusCell'
import { getNetUnitPriceFromLine } from '@admin/modules/Quotation/utils'
import Router from 'next/router'
import { salesOrderFormSections, salesOrderModule } from './salesOrderConfig'
import {
  invoiceAddFormSections,
  invoiceColumnDefs,
  invoicePreviewFormSections,
} from '../Invoice/invoiceConfig'
import invoiceModule from '../Invoice/invoiceModule'
import {
  deliveryOrderAddFormSections,
  deliveryOrderColumnDefs,
  deliveryOrderPreviewFormSections,
} from '../DeliveryOrder/deliveryOrderConfig'
import { deliveryOrderModule } from '../DeliveryOrder/deliveryOrderModule'
import FulfillmentTab from './components/FulfillmentTab'
import SalesOrderFormTemplate from './components/SalesOrderFormTemplate'
import {
  orderFormAddFormSections,
  orderFormModule,
  orderFormPreviewFormSections,
} from '../OrderForm/orderFormConfig'
import getOrderFormStatusColor from '../OrderForm/utils/getOrderFormStatusColor'
import ProgressiveClaimTab from './components/ProgressiveClaimTab'

export const salesOrderTabs = [
  {
    key: 'general',
    value: 'general',
    label: 'General',
    children: (
      <DocumentDetailPage
        type={DocumentTypeEnum.QUOTATION}
        module={salesOrderModule}
        formSections={salesOrderFormSections}
        crudFormProps={{
          disableHeader: true,
          formTemplate: SalesOrderFormTemplate,
          useCrudFormProps: {
            defaultValues: { title: '-' },
            afterSubmit: ({ item }) => {
              if (item) {
                const url = `${salesOrderModule.route.plural}/${
                  item[salesOrderModule.sk]
                }`

                Router.push(url, url, { shallow: true })
              }
            },
            setFormValues: ({ values }) => ({
              ...omit(values, 'delivery_order'),
              lines: values.lines
                ?.filter((line) => line?.product_id)
                .map((line) => ({
                  ...line,
                  unit_price: getNetUnitPriceFromLine(line),
                })),
            }),
          },
        }}
        containerProps={{ disableGutters: true }}
      />
    ),
  },
  {
    key: 'sales_order_lines',
    value: 'sales_order_lines',
    label: 'Fulfillment',
    render: ({ item }) => <FulfillmentTab salesOrder={item} />,
  },
  {
    key: 'order_forms',
    value: 'order_forms',
    label: 'Order Forms',
    render: ({ item }) => (
      <CrudTable
        module={orderFormModule}
        columnDefs={[
          { field: 'title', headerName: 'OF ID' },
          { field: 'company.title', headerName: 'Supplier' },
          {
            field: 'purchase_order_id',
            headerName: 'PO Reference',
            valueGetter: ({ data }) =>
              uniq(
                data.lines
                  .map(
                    ({ purchase_order_line }) =>
                      purchase_order_line?.[0]?.purchase_order?.title ?? ''
                  )
                  .filter(Boolean)
              ).join(', '),
            valueFormatter: ({ value }) => {
              const titles = value.split(',') as string[]
              const [title] = titles
              const moreCount = titles.length - 1
              if (moreCount) return title?.concat(` +${moreCount} more`)
              return title
            },
          },
          {
            field: 'sales_order.due_at',
            headerName: 'Date Required',
            valueFormatter: ({ data }) =>
              data.due_at && dayjs(data.due_at).format('DD MMM YYYY'),
          },
          {
            field: 'status',
            cellRenderer: ({ value }) => (
              <StatusCell
                color={getOrderFormStatusColor(value)}
                label={value}
              />
            ),
          },
        ]}
        setQuery={(q) => q.eq('sales_order_id', item.id)}
        previewFormSections={orderFormPreviewFormSections}
        addFormSections={orderFormAddFormSections}
        addFormProps={{
          disabledFields: ['sales_order_id'],
          defaultValues: { sales_order_id: item.id },
        }}
        disableAdd
      />
    ),
  },
  {
    key: 'delivery_orders',
    value: 'delivery_orders',
    label: 'Delivery Orders',
    render: ({ item }) => (
      <CrudTable
        module={deliveryOrderModule}
        columnDefs={deliveryOrderColumnDefs}
        setQuery={(q) => q.eq('sales_order_id', item.id)}
        previewFormSections={deliveryOrderPreviewFormSections}
        addFormSections={deliveryOrderAddFormSections}
        addFormProps={{
          disabledFields: ['sales_order_id'],
          defaultValues: { sales_order_id: item.id },
        }}
        disableAdd
      />
    ),
  },
  {
    key: 'progressive_claims',
    value: 'progressive_claims',
    label: 'Progressive Claims',
    render: ({ item }) => <ProgressiveClaimTab salesOrder={item} />,
  },
  {
    key: 'invoices',
    value: 'invoices',
    label: 'Invoices',
    render: ({ item }) => (
      <CrudTable
        module={invoiceModule}
        columnDefs={invoiceColumnDefs}
        setQuery={(q) => q.eq('sales_order_id', item.id)}
        previewFormSections={invoicePreviewFormSections}
        addFormSections={invoiceAddFormSections}
        addFormProps={{
          disabledFields: ['sales_order_id'],
          defaultValues: { sales_order_id: item.id },
        }}
        disableAdd
      />
    ),
  },
]
