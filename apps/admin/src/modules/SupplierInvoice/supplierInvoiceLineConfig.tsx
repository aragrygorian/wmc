import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import TextEditor from '../../components/editors/TextEditor'

export const supplierInvoiceLineModule = {
  sk: 'slug',
  table: {
    name: 'supplier_invoice_line',
  },
  name: {
    singular: 'Supplier Invoice Line',
    plural: 'Supplier Invoice Lines',
  },
  select: {
    list: '*, supplier_invoice(*)',
    detail:
      '*, supplier_invoice(*, project(*, project_brand!project_id(*), brand(*)))',
  },
  Icon: CategoryOutlinedIcon,
}

export const supplierInvoiceLineColumnDefs = [
  {
    colId: 'checkbox',
    maxWidth: 50,
    checkboxSelection: true,
    suppressMenu: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
  },
  { field: 'product.barcode', headerName: 'Barcode', maxWidth: 150 },
  { field: 'product.model_code', headerName: 'Model Code', maxWidth: 150 },
  { field: 'product.title', headerName: 'Product Name' },
  {
    field: 'order_form_line.order_form.title',
    headerName: 'OF Ref',
    maxWidth: 150,
  },
  { field: 'purchase_order.title', headerName: 'PO Ref', maxWidth: 150 },
  {
    field: 'order_form_line.order_form.sales_order.title',
    headerName: 'SO Ref',
    maxWidth: 150,
  },
  {
    field: 'quantity',
    headerName: 'Order Qty',
    maxWidth: 150,
    editable: true,
    cellRenderer: TextEditor,
    cellEditor: TextEditor,
    cellStyle: { padding: 0, height: '100%' },
  },
]
