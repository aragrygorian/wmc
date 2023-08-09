import React, { useMemo, useRef, useState } from 'react'
import { Button, Stack } from '@gravis-os/ui'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
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
import { AgGridReact } from 'ag-grid-react'
import { DataTable } from '@gravis-os/crud'
import { ColDef } from 'ag-grid-community'
import { DeliveryOrderLine } from '@prisma/client'
import { sumBy, uniqBy } from 'lodash'
import { SalesOrder, SalesOrderLine } from '../SalesOrder/types'
import getDeliveryOrderLineFromSaleOrderLine from './utils/getDeliveryOrderLineFromSaleOrderLine'
import { Reservation } from '../Reservation/types'
import TextEditor from '../../components/editors/TextEditor'

interface DeliveryOrderLinesAddDialogProps {
  onAddLines: (lines: Array<Partial<DeliveryOrderLine>>) => void
  reservations: Reservation[]
  salesOrder: SalesOrder
  salesOrderLines: SalesOrderLine[]
}

const DeliveryOrderLinesAddDialog: React.FC<
  DeliveryOrderLinesAddDialogProps
> = (props) => {
  const { reservations, salesOrder, salesOrderLines, onAddLines } = props
  const { title } = salesOrder

  const uniqueSalesOrderProducts = uniqBy(salesOrderLines, 'product_id').map(
    (line) => {
      const nextReservations = reservations.filter(
        (reservation) => reservation.product_id === line.product_id
      )

      return {
        ...line,
        quantity:
          sumBy(nextReservations, 'in') - sumBy(nextReservations, 'out'),
      }
    }
  )

  const salesOderLinesColumnDef: ColDef[] = useMemo(
    () => [
      {
        colId: 'checkbox',
        maxWidth: 50,
        checkboxSelection: true,
        suppressMenu: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
      },
      { field: 'product.model_code', headerName: 'Model Code', maxWidth: 150 },
      { field: 'product.title', headerName: 'Product Name' },
      {
        field: 'quantity',
        headerName: 'To deliver',
        valueParser: 'Number(newValue)',
        filter: 'agNumberColumnFilter',
        maxWidth: 150,
        editable: true,
        cellStyle: { padding: 0, height: '100%' },
        cellRenderer: TextEditor,
        cellEditor: TextEditor,
      },
    ],
    [salesOrderLines]
  )

  const [open, setOpen] = useState(false)

  const tableRef = useRef<AgGridReact>(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleAddLines = () => {
    const lines = tableRef.current?.api
      .getSelectedRows()
      .map(getDeliveryOrderLineFromSaleOrderLine)
      .filter(({ quantity }) => quantity >= 0)

    if (lines) onAddLines(lines)

    handleClose()
  }

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
          <Tabs value={0}>
            <Tab label="PRODUCT LIST" />
          </Tabs>
          <DataTable
            ref={tableRef}
            columnDefs={salesOderLinesColumnDef}
            rowData={uniqueSalesOrderProducts}
            singleClickEdit
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Back
          </Button>
          <Button variant="contained" onClick={handleAddLines}>
            Add Selected
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeliveryOrderLinesAddDialog
