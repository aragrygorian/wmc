import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import useUser from '@admin/app/useUser'
import { AgGridReact } from 'ag-grid-react'
import { DataTable, useCreateMutation } from '@gravis-os/crud'
import { Reservation } from '@admin/modules/Reservation/types'
import reservationModule from '@admin/modules/Reservation/reservationModule'
import { orderFormModule } from '@admin/modules/OrderForm/orderFormConfig'
import { useQueryClient } from 'react-query'
import { WarehouseProduct } from '@admin/modules/Warehouse/types'
import { PurchaseOrderLine } from '@admin/modules/PurchaseOrder/types'
import DialogButton from '@admin/components/DialogButton'
import Tabs from '@admin/components/Tabs'
import { pick, sumBy } from 'lodash'
import TextEditor from '@admin/components/editors/TextEditor'
import ModuleLink from '@admin/components/ModuleLink'
import purchaseOrderModule from '@admin/modules/PurchaseOrder/purchaseOrderModule'
import dayjs from 'dayjs'
import { OrderFormLine } from '@admin/modules/OrderForm/types'
import { useFetchWarehouseProducts } from '@admin/modules/Warehouse/hooks/useFetchWarehouseProducts'
import { useFetchPurchaseOrderLines } from '@admin/modules/PurchaseOrder/hooks/useFetchPurchaseOrderLine'
import { Box } from '@gravis-os/ui'

type ReserveLine<T> = T & {
  reserved_quantity: number
}

interface OrderFormLineReserveDialogButtonProps {
  disabled?: boolean
  orderFormLine: OrderFormLine
}

const OrderFormLineReserveDialogButton: React.FC<
  OrderFormLineReserveDialogButtonProps
> = (props) => {
  const { disabled, orderFormLine } = props

  const { query } = useRouter()
  const { slug } = query

  const { user } = useUser()

  const queryClient = useQueryClient()

  const { createMutation } = useCreateMutation<Reservation>({
    module: reservationModule,
    options: {
      onSuccess: () =>
        queryClient.invalidateQueries([orderFormModule.table.name, slug]),
    },
  })

  const warehouseProductRef = useRef<AgGridReact>()
  const purchaseOrderLineRef = useRef<AgGridReact>()

  const match = { product_id: orderFormLine.product_id }

  const { data: warehouseProducts } = useFetchWarehouseProducts({
    match,
  })

  const { data: purchaseOrderLines } = useFetchPurchaseOrderLines({
    match,
    or: `order_form_line_id.eq.${orderFormLine.id},order_form_line_id.is.null`,
  })

  const handleClickReserve = async () => {
    if (warehouseProductRef?.current) {
      warehouseProductRef?.current?.api.forEachNode(async (row) => {
        const warehouseProduct = row.data as ReserveLine<WarehouseProduct>

        if (!warehouseProduct.reserved_quantity) return

        await createMutation.mutateAsync({
          created_by: user?.id,
          updated_by: user?.id,
          in: warehouseProduct.reserved_quantity,
          order_form_line_id: orderFormLine.id,
          ...pick(warehouseProduct, ['warehouse_id', 'product_id']),
        })
      })
    }

    if (purchaseOrderLineRef?.current) {
      purchaseOrderLineRef?.current?.api.forEachNode(async (row) => {
        const purchaseOrderLine = row.data as ReserveLine<PurchaseOrderLine>

        if (!purchaseOrderLine.reserved_quantity) return

        await createMutation.mutateAsync({
          created_by: user?.id,
          updated_by: user?.id,
          in: purchaseOrderLine.reserved_quantity,
          purchase_order_line_id: purchaseOrderLine.id,
          product_id: purchaseOrderLine.product_id,
          warehouse_id: purchaseOrderLine?.purchase_order.warehouse_id,
          order_form_line_id: orderFormLine.id,
        })
      })
    }
  }

  return (
    <Box>
      <DialogButton
        title="Reserve"
        buttonProps={{
          disabled,
          variant: 'text',
          color: 'inherit',
          sx: { minWidth: 86, width: '100%' },
        }}
        actionButtonProps={{
          children: 'Reserve',
          onClick: handleClickReserve,
        }}
      >
        <Tabs
          sx={{ mt: -2.5 }}
          tabs={[
            {
              title: 'INVENTORY',
              children: (
                <DataTable
                  ref={warehouseProductRef}
                  singleClickEdit
                  rowData={warehouseProducts}
                  columnDefs={[
                    {
                      field: 'product.model_code',
                      headerName: 'Model Code',
                      minWidth: 120,
                      maxWidth: 120,
                      valueFormatter: ({ value }) => value && `#${value}`,
                    },
                    {
                      minWidth: 600,
                      field: 'product_id',
                      headerName: 'Product Name',
                      valueGetter: ({ data }) => data.product?.title,
                      flex: 1,
                    },
                    {
                      field: 'warehouse.title',
                      headerName: 'Location',
                      maxWidth: 250,
                    },
                    {
                      field: 'inventory',
                      headerName: 'Available Inventory',
                      maxWidth: 250,
                      valueGetter: ({ data }: { data: WarehouseProduct }) =>
                        sumBy(
                          data.inventory,
                          (inventory) => inventory.in - inventory.out
                        ) -
                        sumBy(
                          data.reservation,
                          (reservation) => reservation.in - reservation.out
                        ),
                    },
                    {
                      field: 'reserved_quantity',
                      headerName: 'Reserve Qty',
                      editable: true,
                      maxWidth: 200,
                      cellStyle: { padding: 0, height: '100%' },
                      cellEditor: TextEditor,
                      cellRenderer: TextEditor,
                    },
                  ]}
                />
              ),
            },
            {
              title: 'PO OTW',
              children: (
                <DataTable
                  ref={purchaseOrderLineRef}
                  singleClickEdit
                  rowData={purchaseOrderLines}
                  columnDefs={[
                    {
                      field: 'product.model_code',
                      headerName: 'Model Code',
                      minWidth: 120,
                      maxWidth: 120,
                      valueFormatter: ({ value }) => value && `#${value}`,
                    },
                    {
                      minWidth: 400,
                      field: 'product_id',
                      headerName: 'Product Name',
                      valueGetter: ({ data }) => data.product?.title,
                    },
                    {
                      field: 'purchase_order.title',
                      headerName: 'PO Ref',
                      cellRenderer: ({ data }) => (
                        <ModuleLink
                          module={purchaseOrderModule}
                          item={data.purchase_order}
                        />
                      ),
                    },
                    {
                      field: 'purchase_order.ready_at',
                      headerName: 'Est. Goods Ready Date',
                      cellRenderer: ({ value }) =>
                        value && dayjs(value).format('DD MMM YYYY'),
                    },
                    {
                      field: 'quantity',
                      headerName: 'Ordered Qty',
                      minWidth: 100,
                    },
                    {
                      field: 'arrived_quantity',
                      headerName: 'Arrived Qty',
                      minWidth: 100,
                      valueGetter: ({ data }: { data: PurchaseOrderLine }) =>
                        sumBy(data.inventory, 'in'),
                    },
                    {
                      field: 'reserved_quantity',
                      headerName: 'Reserve Qty',
                      editable: true,
                      maxWidth: 200,
                      cellStyle: { padding: 0, height: '100%' },
                      cellEditor: TextEditor,
                      cellRenderer: TextEditor,
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      </DialogButton>
    </Box>
  )
}

export default OrderFormLineReserveDialogButton
