import React from 'react'
import { Alert, Box } from '@gravis-os/ui'
import { CrudTable } from '@gravis-os/crud'
import { quotationModule } from '@admin/modules/Quotation/quotationModule'
import {
  quotationColumnDefs,
  quotationPreviewFormSections,
} from '../Quotation/quotationConfig'
import {
  invoiceColumnDefs,
  invoicePreviewFormSections,
} from '../Invoice/invoiceConfig'
import invoiceModule from '../Invoice/invoiceModule'
import {
  salesOrderColumnDefs,
  salesOrderModule,
  salesOrderPreviewFormSections,
} from '../SalesOrder/salesOrderConfig'
import {
  orderFormColumnDefs,
  orderFormModule,
  orderFormPreviewFormSections,
} from '../OrderForm/orderFormConfig'
import {
  deliveryOrderColumnDefs,
  deliveryOrderModule,
  deliveryOrderPreviewFormSections,
} from '../DeliveryOrder'
import UserSalesActivity from './UserSalesActivity'

export const userTabs = [
  {
    key: 'memos',
    value: 'memos',
    label: 'Sales Activity',
    render: ({ item }) => {
      return (
        <Box sx={{ mt: 2 }}>
          <UserSalesActivity user={item} />
        </Box>
      )
    },
  },
  {
    key: 'quotations',
    value: 'quotations',
    label: 'Quotations',
    render: ({ item }) => {
      return (
        <CrudTable
          disableAdd
          module={quotationModule}
          columnDefs={quotationColumnDefs}
          setQuery={(q) => q.eq('created_by', item.id)}
          previewFormSections={quotationPreviewFormSections}
        />
      )
    },
  },
  {
    key: 'invoices',
    value: 'invoices',
    label: 'Invoices',
    render: ({ item }) => {
      return (
        <CrudTable
          disableAdd
          module={invoiceModule}
          columnDefs={invoiceColumnDefs}
          setQuery={(q) => q.eq('created_by', item.id)}
          previewFormSections={invoicePreviewFormSections}
        />
      )
    },
  },
  {
    key: 'sales_orders',
    value: 'sales_orders',
    label: 'Sales Orders',
    render: ({ item }) => {
      return (
        <CrudTable
          disableAdd
          module={salesOrderModule}
          columnDefs={salesOrderColumnDefs}
          setQuery={(q) => q.eq('created_by', item.id)}
          previewFormSections={salesOrderPreviewFormSections}
        />
      )
    },
  },
  {
    key: 'order_forms',
    value: 'order_forms',
    label: 'Order Forms',
    render: ({ item }) => {
      return (
        <CrudTable
          disableAdd
          module={orderFormModule}
          columnDefs={orderFormColumnDefs}
          setQuery={(q) => q.eq('created_by', item.id)}
          previewFormSections={orderFormPreviewFormSections}
        />
      )
    },
  },
  {
    key: 'delivery_orders',
    value: 'delivery_orders',
    label: 'Delivery Orders',
    render: ({ item }) => {
      return (
        <CrudTable
          disableAdd
          module={deliveryOrderModule}
          columnDefs={deliveryOrderColumnDefs}
          setQuery={(q) => q.eq('created_by', item.id)}
          previewFormSections={deliveryOrderPreviewFormSections}
        />
      )
    },
  },
  {
    key: 'commission',
    value: 'commission',
    label: 'Commission',
    render: ({ item }) => {
      return (
        <Alert severity="info" sx={{ mt: 2 }}>
          How shall we calculate commission?
        </Alert>
      )
    },
  },
]
