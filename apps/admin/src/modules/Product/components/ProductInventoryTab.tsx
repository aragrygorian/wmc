import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { DataTable } from '@gravis-os/crud'
import { ColDef } from 'ag-grid-community'
import { sumBy } from 'lodash'
import { Button, Stack } from '@mui/material'
import {
  AddCircleOutlineOutlined,
  RemoveCircleOutline,
} from '@mui/icons-material'
import StatusCell from '@admin/components/StatusCell'
import { WAREHOUSE_STATUS_CONFIG } from '@admin/modules/Warehouse/constants'
import { getColorFromStatusConfig } from '@admin/utils/getColorFromStatusConfig'
import { Product } from '../types'
import { purchaseOrderLineModule } from '../../PurchaseOrder/purchaseOrderLineConfig'
import { PurchaseOrderLine } from '../../PurchaseOrder/types'
import { getInstock } from '../../Inventory/utils/getInstock'
import ProductInventoryDialog from './ProductInventoryDialog'
import { useFetchWarehouseProducts } from '../../Warehouse/hooks/useFetchWarehouseProducts'

type ProductInventoryDialogType = 'ADD' | 'REMOVE'

interface ProductInventoryTabProps {
  item: Product
}

const PURCHASE_ORDER_LINE_SELECT = '*, purchase_order:purchase_order_id(*)'

const getPurchaseOrderLineMatcher = (id: number) => ({ product_id: id })

const fetchPurchaseOrderLines = async (id: number) => {
  const { data } = await supabaseClient
    .from<PurchaseOrderLine>(purchaseOrderLineModule.table.name)
    .select(PURCHASE_ORDER_LINE_SELECT)
    .match(getPurchaseOrderLineMatcher(id))

  return data
}

const ProductInventoryTab: React.FC<ProductInventoryTabProps> = (props) => {
  const { item } = props

  const { data: warehouseProducts, refetch: refetchWarehouseProducts } =
    useFetchWarehouseProducts({
      match: { product_id: item.id },
    })

  const { data: purchaseOrderLines } = useQuery(
    [
      purchaseOrderLineModule.table.name,
      PURCHASE_ORDER_LINE_SELECT,
      getPurchaseOrderLineMatcher(item.id),
    ],
    () => fetchPurchaseOrderLines(item.id)
  )

  const [isOpenDialog, setIsOpenDialog] = useState<
    ProductInventoryDialogType | false
  >(false)

  const isInbound = isOpenDialog === 'ADD'

  const columnDefs: ColDef[] = [
    {
      field: 'warehouse.title',
      headerName: 'Warehouse',
    },
    {
      field: 'location',
      headerName: 'Location',
      cellRenderer: ({ data }) => {
        const { warehouse } = data
        const {
          address_city,
          address_country,
          address_line_1,
          address_line_2,
          address_postal_code,
        } = warehouse

        return [
          address_line_1,
          address_line_2,
          [address_city, address_country].filter(Boolean).join(' '),
          address_postal_code,
        ].map((part, index, array) => (
          <>
            {part}
            {array.length - 1 !== index && <br />}
          </>
        ))
      },
    },
    {
      field: 'instock',
      headerName: 'Instock',
      valueGetter: ({ data }) => getInstock(data?.inventory),
    },
    {
      field: 'available_stocks',
      headerName: 'Available Stocks',
      minWidth: 170,
      valueGetter: ({ data, getValue }) =>
        getValue('instock') -
        sumBy(data?.reservation, 'in') -
        sumBy(data?.reservation, 'out'),
    },
    {
      field: 'units_otw',
      headerName: 'Units OTW',
      valueGetter: ({ data }) => {
        const ordered = sumBy(
          purchaseOrderLines?.filter(
            (purchaseOrderLine) =>
              purchaseOrderLine?.purchase_order?.warehouse_id ===
              data?.warehouse_id
          ),
          'quantity'
        )

        const received = sumBy(
          data?.inventory?.filter(
            (inventory) => inventory?.purchase_order_line_id
          ),
          'in'
        )

        return ordered - received
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      valueGetter: ({ getValue }) => getValue('instock'),
      cellRenderer: ({ value }) => {
        const label = value > 0 ? 'Instock' : 'Out of Stock'

        return (
          <StatusCell
            label={label}
            color={getColorFromStatusConfig(WAREHOUSE_STATUS_CONFIG)(value)}
          />
        )
      },
    },
  ]

  const closeDialog = () => setIsOpenDialog(false)

  const handleSaveSuccess = async () => {
    await refetchWarehouseProducts()
    setIsOpenDialog(false)
  }

  return (
    <>
      <Stack direction="row" sx={{ justifyContent: 'flex-end', gap: 1, mb: 2 }}>
        {/* FIXME: Previously has variant="neutral" which caused build error */}
        <Button
          startIcon={<RemoveCircleOutline />}
          onClick={() => setIsOpenDialog('REMOVE')}
        >
          REMOVE STOCK
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineOutlined />}
          onClick={() => setIsOpenDialog('ADD')}
        >
          ADD STOCK
        </Button>
      </Stack>
      <DataTable
        rowHeight={80}
        rowData={warehouseProducts}
        columnDefs={columnDefs}
      />
      <ProductInventoryDialog
        dialogTitles={
          isInbound
            ? ['Add Stock Quantity', 'Select Warehouse to Add Stock Quantity']
            : [
                'Remove Stock Quantity',
                'Select Warehouse to Remove Stock Quantity',
              ]
        }
        isInbound={isInbound}
        open={Boolean(isOpenDialog)}
        onClose={closeDialog}
        onSaveSuccess={handleSaveSuccess}
        warehouseProducts={warehouseProducts}
      />
    </>
  )
}

export default ProductInventoryTab
