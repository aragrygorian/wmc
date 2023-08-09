import React from 'react'
import { CrudTable } from '@gravis-os/crud'
import PurchaseOrderGeneralTab from './components/PurchaseOrderGeneralTab'
import {
  purchaseOrderLineColumnDefs,
  purchaseOrderLineModule,
} from './purchaseOrderLineConfig'
import PurchaseOrderStockHistoryTab from './components/PurchaseOrderStockHistoryTab'

export const purchaseOrderTabs = [
  {
    key: 'general',
    value: 'general',
    label: 'General',
    children: <PurchaseOrderGeneralTab />,
  },
  {
    key: 'purchase_order_lines',
    value: 'purchase_order_lines',
    label: 'Fulfillment',
    render: ({ item }) => (
      <CrudTable
        module={purchaseOrderLineModule}
        columnDefs={purchaseOrderLineColumnDefs}
        setQuery={(q) => q.eq('purchase_order_id', item.id)}
        disableAdd
        disableDelete
        disablePreview
        disableManage
        disableTitle
        disableActions
      />
    ),
  },
  {
    key: 'stock_history',
    value: 'stock_history',
    label: 'Stock History',
    render: (props) => <PurchaseOrderStockHistoryTab {...props} />,
  },
]
