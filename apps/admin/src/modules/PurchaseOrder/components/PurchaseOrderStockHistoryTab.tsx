import React from 'react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import useUser from '@admin/app/useUser'
import { DataTable } from '@gravis-os/crud'
import { useQuery } from 'react-query'
import dayjs from 'dayjs'
import { PurchaseOrder } from '../types'
import { warehouseProductModule } from '../../Warehouse/warehouseProductConfig'
import { WarehouseProduct } from '../../Warehouse/types'
import UserCell from '../../../components/UserCell'

interface PurchaseOrderStockHistoryTabProps {
  item: PurchaseOrder
}

const PurchaseOrderStockHistoryTab: React.FC<
  PurchaseOrderStockHistoryTabProps
> = (props) => {
  const { user } = useUser()
  const { item: purchaseOrder } = props
  const { id, warehouse_id } = purchaseOrder
  const table = warehouseProductModule.table.name
  const selector =
    '*, inventory!inner(*, purchase_order_line!inner(*, product:product_id(*)))'
  const matcher = {
    warehouse_id,
    'inventory.purchase_order_line.purchase_order_id': id,
  }
  const { data: warehouseProducts } = useQuery({
    queryKey: [table, selector, matcher],
    queryFn: async () => {
      const { data: warehouseProducts } = await supabaseClient
        .from<WarehouseProduct>(table)
        .select(selector)
        .match(matcher)
      return warehouseProducts
    },
    enabled: Boolean(user && id && warehouse_id),
  })
  const inventories =
    warehouseProducts
      ?.flatMap(({ inventory }) => inventory)
      .filter(({ in: inbound }) => inbound) || []

  return (
    <DataTable
      rowData={inventories}
      columnDefs={[
        {
          field: 'purchase_order_line.product.model_code',
          headerName: 'Model code',
          minWidth: 100,
          maxWidth: 100,
        },
        {
          field: 'purchase_order_line.product.title',
          headerName: 'Product Name',
          minWidth: 250,
        },
        {
          field: 'updated_by',
          headerName: 'Last Updated By',
          cellRenderer: ({ value }) => <UserCell id={value} />,
        },
        {
          field: 'ref_no',
          headerName: 'Reference No.',
        },
        {
          field: 'quantity',
          headerName: 'Item Received',
          valueGetter: ({ data }) => data.in,
        },
        {
          field: 'created_at',
          headerName: 'Created At',
          valueFormatter: ({ value }) =>
            value && dayjs(value).format('DD MMM YYYY'),
        },
      ]}
    />
  )
}

export default PurchaseOrderStockHistoryTab
