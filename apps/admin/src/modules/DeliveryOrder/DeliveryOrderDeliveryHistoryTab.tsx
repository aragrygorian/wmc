import UserCell from '@admin/components/UserCell'
import { CrudTable } from '@gravis-os/crud'
import dayjs from 'dayjs'
import { isNil } from 'lodash'
import React, { FC } from 'react'
import { deliveryOrderModule } from './deliveryOrderModule'
import { DeliveryOrder } from './types'

interface DeliveryOrderDeliveryHistoryTabProps {
  deliveryOrder: DeliveryOrder
}

const deliveryOrderHistoryColumnDefs = [
  {
    field: 'updated_by',
    headerName: 'Last Updated By',
    cellRenderer: ({ data }) => (
      <UserCell id={data?.updated_by} pk="full_name" />
    ),
  },
  {
    field: 'driver_name',
    headerName: 'Driver',
  },
  {
    field: 'received_by',
    headerName: 'Received By',
  },
  {
    field: 'delivered_on',
    headerName: 'Delivered On',
    valueFormatter: ({ value }) =>
      value ? dayjs(value).format('DD MMM YYYY, HH:mm') : '',
  },
]

const DeliveryOrderDeliveryHistoryTab: FC<
  DeliveryOrderDeliveryHistoryTabProps
> = (props) => {
  const { deliveryOrder } = props
  const { id, delivered_on: deliveredOn } = deliveryOrder

  // If delivered_on is null, means not delivered yet and therefore don't show anything

  return !isNil(deliveredOn) ? (
    <CrudTable
      module={deliveryOrderModule}
      columnDefs={deliveryOrderHistoryColumnDefs}
      setQuery={(query) => query.eq('id', id)}
      disableAdd
      disableActions
      disableManage
      disablePreview
      disableDelete
      disableTitle
    />
  ) : null
}

export default DeliveryOrderDeliveryHistoryTab
