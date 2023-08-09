import React, { useRef, useState } from 'react'
import { DataTable } from '@gravis-os/crud'
import useUser from '@admin/app/useUser'
import { Button, Stack } from '@gravis-os/ui'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Tab,
  Tabs,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { useQuery } from 'react-query'
import dayjs from 'dayjs'
import TextEditor from 'src/components/editors/TextEditor'
import { Company } from '@prisma/client'
import { AgGridReact } from 'ag-grid-react'
import { Product } from '../../Product/types'
import productModule from '../../Product/productModule'
import { PurchaseOrderLine } from '../types'
import {
  getPurchaseOrderLineFromOrderFormLine,
  getPurchaseOrderLineFromProduct,
} from '../utils'
import { useFetchOrderFormLines } from '../../OrderForm/hooks/useFetchOrderFormLines'

const orderFormLinesColumnDefs = [
  {
    colId: 'checkbox',
    maxWidth: 50,
    checkboxSelection: true,
    suppressMenu: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
  },
  { field: 'order_form.title', headerName: 'OF ID', maxWidth: 150 },
  {
    field: 'order_form.due_at',
    headerName: 'OF Date Needed',
    valueGetter: ({ data }) =>
      dayjs(data.order_form.due_at).format('DD MMM YYYY'),
    maxWidth: 150,
  },
  {
    field: 'order_form.created_at',
    headerName: 'OF Created At',
    valueGetter: ({ data }) =>
      dayjs(data.order_form.created_at).format('DD MMM YYYY'),
    maxWidth: 150,
  },
  { field: 'product.model_code', headerName: 'Model Code', maxWidth: 150 },
  { field: 'product.title', headerName: 'Product Name' },
  {
    field: 'quantity',
    headerName: 'To Order',
    valueParser: 'Number(newValue)',
    filter: 'agNumberColumnFilter',
    maxWidth: 150,
  },
]

const productColumnDefs = [
  {
    colId: 'checkbox',
    maxWidth: 50,
    checkboxSelection: true,
    suppressMenu: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
  },
  { field: 'brand.title', headerName: 'Brand', maxWidth: 150 },
  { field: 'model_code', headerName: 'Model Code', maxWidth: 150 },
  { field: 'title', headerName: 'Product Name' },
  {
    field: 'quantity',
    headerName: 'To Order',
    editable: true,
    cellRenderer: TextEditor,
    cellEditor: TextEditor,
    valueParser: 'Number(newValue)',
    filter: 'agNumberColumnFilter',
    cellStyle: { padding: 0, height: '100%' },
    maxWidth: 150,
  },
]

interface PurchaseOrderLinesAddDialogProps {
  onAddLines: (lines: Array<Partial<PurchaseOrderLine>>) => void
  supplier: Company
}

const PurchaseOrderLinesAddDialog: React.FC<
  PurchaseOrderLinesAddDialogProps
> = (props) => {
  const { supplier, onAddLines } = props
  const { title } = supplier
  const { user } = useUser()
  const [tab, setTab] = useState<0 | 1>(0)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const orderFormLineRef = useRef<AgGridReact>(null)
  const productRef = useRef<AgGridReact>(null)

  const handleAddlines = () => {
    const lines = (tab === 0 ? orderFormLineRef : productRef).current?.api
      .getSelectedRows()
      .map(
        tab === 0
          ? getPurchaseOrderLineFromOrderFormLine
          : getPurchaseOrderLineFromProduct
      )
      .filter(({ quantity }) => Boolean(quantity))
    if (lines) onAddLines(lines)
    handleClose()
  }

  const { data: orderFormLines } = useFetchOrderFormLines({
    select: '*, order_form!inner(*), product:product_id(*)',
    match: { 'order_form.company_id': supplier.id },
  })

  const productTableName = productModule.table.name
  const productSelector = '*, brand!inner(*, company:company_id(*))'
  const productMatcher = { 'brand.company_id': supplier.id }
  const { data: products } = useQuery({
    queryKey: [productTableName, productSelector, productMatcher],
    queryFn: async () => {
      const { data: products } = await supabaseClient
        .from<Product>(productTableName)
        .select(productSelector)
        .match(productMatcher)
      return products
    },
    enabled: Boolean(user),
  })

  return (
    <>
      <Button startIcon={<AddOutlinedIcon />} onClick={handleOpen}>
        Add Row
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' } as TransitionProps}
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            Search for {title} Product
            <IconButton onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 0 }}>
          <Tabs value={tab} onChange={(_, value) => setTab(value)}>
            <Tab label="ORDER FORM LIST" />
            <Tab label="PRODUCT LIST" />
          </Tabs>
          {tab === 0 && (
            <DataTable
              ref={orderFormLineRef}
              columnDefs={orderFormLinesColumnDefs}
              rowData={orderFormLines}
            />
          )}
          {tab === 1 && (
            <DataTable
              ref={productRef}
              columnDefs={productColumnDefs}
              rowData={products}
              singleClickEdit
            />
          )}
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Back
          </Button>
          <Button variant="contained" onClick={handleAddlines}>
            Add Selected
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PurchaseOrderLinesAddDialog
