import React, { useRef, useState } from 'react'
import { Stack } from '@mui/material'
import { DataTable } from '@gravis-os/crud'
import { SplitButton, SplitButtonOption } from '@gravis-os/ui'
import { AgGridReact } from 'ag-grid-react'
import { salesOrderLineColumnDefs } from '../salesOrderLineConfig'
import { SalesOrder, SalesOrderLine } from '../types'
import { useFetchSalesOrderLines } from '../hooks/useFetchSalesOrderLines'
import OrderFormAddDialog from './OrderFormAddDialog'
import DeliveryOrderAddDialog from './DeliveryOrderAddDialog'
import ProgressiveClaimAddDialog from './ProgressiveClaimAddDialog'

type FulfillmentTabDialog =
  | 'DELIVERY_ORDER'
  | 'ORDER_FORM'
  | 'PROGRESSIVE_CLAIM'

interface FulfillmentTabProps {
  salesOrder: SalesOrder
}

const FulfillmentTab: React.FC<FulfillmentTabProps> = (props) => {
  const { salesOrder } = props

  const { data: salesOrderLines } = useFetchSalesOrderLines({
    match: { sales_order_id: salesOrder.id },
  })

  const [selectedItems, setSelectedItems] = useState<SalesOrderLine[]>([])
  const [option, setOption] = useState<FulfillmentTabDialog>('ORDER_FORM')

  const gridRef = useRef<AgGridReact>()

  // Split button props
  const disabled = !selectedItems.length

  const options: SplitButtonOption<FulfillmentTabDialog>[] = [
    {
      label: 'Add Order Form',
      value: 'ORDER_FORM' as const,
      render: () => (
        <OrderFormAddDialog
          salesOrder={salesOrder}
          salesOrderLines={selectedItems}
          disabled={disabled}
        />
      ),
    },
    {
      label: 'Add Delivery Order',
      value: 'DELIVERY_ORDER' as const,
      render: () => (
        <DeliveryOrderAddDialog
          salesOrder={salesOrder}
          salesOrderLines={selectedItems}
          disabled={disabled}
        />
      ),
    },
    {
      label: 'Add Progressive Claim',
      value: 'PROGRESSIVE_CLAIM' as const,
      render: () => (
        <ProgressiveClaimAddDialog
          salesOrder={salesOrder}
          salesOrderLines={selectedItems}
          disabled={disabled}
        />
      ),
    },
  ]

  const handleChangeSplitButton = (option: SplitButtonOption) => {
    const { value } = option

    setSelectedItems([])
    setOption(value as FulfillmentTabDialog)
    gridRef.current?.api.redrawRows()
    gridRef.current?.api.refreshHeader()
  }

  const getBalanceColumnKey = (step: FulfillmentTabDialog) => {
    switch (step) {
      case 'DELIVERY_ORDER':
        return 'delivery_order_balance'
      case 'PROGRESSIVE_CLAIM':
        return 'progressive_claim_balance'
      default:
        return 'order_form_balance'
    }
  }

  return (
    <>
      <Stack alignItems="flex-end" mb={2}>
        <SplitButton
          options={options}
          disabled={disabled}
          onChange={handleChangeSplitButton}
          onClick={({ value }) => setOption(value as FulfillmentTabDialog)}
        />
      </Stack>
      <DataTable
        ref={gridRef}
        rowData={salesOrderLines}
        columnDefs={salesOrderLineColumnDefs}
        onSelectionChanged={(event) =>
          setSelectedItems(event.api.getSelectedRows())
        }
        context={{
          getCheckboxSelection: ({ api, node }) =>
            api.getValue(getBalanceColumnKey(option), node) > 0,
        }}
      />
    </>
  )
}

export default FulfillmentTab
