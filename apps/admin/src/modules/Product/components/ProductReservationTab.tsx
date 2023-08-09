import React from 'react'
import { ColDef } from 'ag-grid-community'
import { DataTable } from '@gravis-os/crud'
import dayjs from 'dayjs'
import { Chip } from '@gravis-os/ui'
import StatusCell from '@admin/components/StatusCell'
import { Product } from '../types'
import { getReservationStatusColor } from '../../Reservation/utils/getReservationStatusColor'
import UserCell from '../../../components/UserCell'
import { useFetchWarehouseProducts } from '../../Warehouse/hooks/useFetchWarehouseProducts'

interface ProductReservationTabProps {
  item: Product
}

const ProductReservationTab: React.FC<ProductReservationTabProps> = (props) => {
  const { item } = props

  const { data: warehouseProducts } = useFetchWarehouseProducts({
    match: { product_id: item.id },
  })

  const reservations = warehouseProducts?.flatMap(
    ({ reservation }) => reservation
  )

  const columnDefs: ColDef[] = [
    {
      field: 'of_id',
      headerName: 'OF ID',
      valueGetter: ({ data }) => data?.order_form_line?.order_form.title,
    },
    {
      field: 'so_ref',
      headerName: 'SO Ref',
      minWidth: 200,
      valueGetter: ({ data }) =>
        data?.order_form_line?.order_form?.sales_order?.title,
    },
    {
      field: 'project_name',
      headerName: 'Project Name',
      valueGetter: ({ data }) =>
        data?.order_form_line?.order_form?.sales_order?.project?.title,
    },
    {
      field: 'created_by',
      headerName: 'Created By',
      cellRenderer: ({ data }) => <UserCell id={data?.created_by} />,
    },
    { field: 'quantity', headerName: 'Reserve Qty' },
    {
      field: 'created_at',
      headerName: 'Created At',
      valueFormatter: ({ data }) =>
        dayjs(data?.created_at).format('DD MMM YYYY'),
    },
    {
      field: 'status',
      headerName: 'Status',
      cellRenderer: ({ value }) => (
        <StatusCell color={getReservationStatusColor(value)} label={value} />
      ),
    },
  ]

  return <DataTable rowData={reservations} columnDefs={columnDefs} />
}

export default ProductReservationTab
