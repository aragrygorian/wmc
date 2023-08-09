import React, { useRef } from 'react'
import { DataTable } from '@gravis-os/crud'
import { useUser } from '@gravis-os/auth'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useQuery } from 'react-query'
import { Company } from '@prisma/client'
import { AgGridReact } from 'ag-grid-react'
import { lte, pick, sumBy } from 'lodash'
import { purchaseOrderLineModule } from '../../PurchaseOrder/purchaseOrderLineConfig'
import DialogButton from '../../../components/DialogButton'
import { PurchaseOrderLine } from '../../PurchaseOrder/types'
import { supplierInvoiceLineColumnDefs } from '../supplierInvoiceLineConfig'
import { SupplierInvoiceLine } from '../types'

interface SupplierInvoiceLinesAddDialogProps {
  onAddLines: (lines: Array<Partial<SupplierInvoiceLine>>) => void
  supplier: Company
}

const SupplierInvoiceLinesAddDialog: React.FC<
  SupplierInvoiceLinesAddDialogProps
> = (props) => {
  const { supplier, onAddLines } = props
  const { user } = useUser()

  const purchaseOrderLineRef = useRef<AgGridReact>(null)

  const handleAddlines = () => {
    const lines = purchaseOrderLineRef.current?.api
      .getSelectedRows()
      .filter(({ quantity }) => Number.parseInt(String(quantity), 10) > 0)
      .map((line) => ({
        purchase_order_line_id: line.id,
        purchase_order_line: line,
        discount_rate: line.purchase_order.discount_rate,
        ...pick(line, ['quantity', 'unit_price', 'product', 'product_id']),
      }))
    if (lines) onAddLines(lines)
  }

  const tableName = purchaseOrderLineModule.table.name
  const selector = `*,
    purchase_order!inner(*),
    product:product_id(*),
    supplier_invoice_line(*),
    order_form_line:order_form_line_id(*,
      order_form(*,
        sales_order(*)
      )
    )`
  const matcher = { 'purchase_order.company_id': supplier.id }
  const { data: purchaseOrderLines } = useQuery({
    queryKey: [tableName, selector, matcher],
    queryFn: async () => {
      const { data: purchaseOrderLines } = await supabaseClient
        .from<
          PurchaseOrderLine & { supplier_invoice_line: SupplierInvoiceLine[] }
        >(tableName)
        .select(selector)
        .match(matcher)
      return purchaseOrderLines
    },
    enabled: Boolean(user),
  })
  const purchaseOrderLinesWithDefaultQuantity = purchaseOrderLines
    ?.map(({ quantity, supplier_invoice_line, ...rest }) => ({
      ...rest,
      quantity: quantity - sumBy(supplier_invoice_line, 'quantity'),
    }))
    .filter(({ quantity }) => quantity > 0)

  const columnDefs = supplierInvoiceLineColumnDefs.map((columnDef) =>
    columnDef.field === 'quantity'
      ? {
          ...columnDef,
          cellRendererParams: ({ rowIndex, value }) => ({
            withToastValidationProps: {
              helperText: 'Please ensure quantity is valid.',
              validatorFns: [
                () =>
                  lte(
                    value,
                    purchaseOrderLinesWithDefaultQuantity?.[rowIndex]?.quantity
                  ),
              ],
            },
          }),
        }
      : columnDef
  )

  return (
    <DialogButton
      title="Add Row"
      buttonProps={{ startIcon: <AddOutlinedIcon /> }}
      actionButtonProps={{ onClick: handleAddlines, children: 'Add Selected' }}
    >
      <DataTable
        ref={purchaseOrderLineRef}
        columnDefs={columnDefs}
        rowData={purchaseOrderLinesWithDefaultQuantity}
        singleClickEdit
      />
    </DialogButton>
  )
}

export default SupplierInvoiceLinesAddDialog
