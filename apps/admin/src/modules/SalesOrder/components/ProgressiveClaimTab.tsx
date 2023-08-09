import React from 'react'
import { CrudTable } from '@gravis-os/crud'
import { printAmount } from '@gravis-os/utils'
import { Chip } from '@gravis-os/ui'
import dayjs from 'dayjs'
import StatusCell from '@admin/components/StatusCell'
import { progressiveClaimPreviewFormSections } from '../../ProgressiveClaim/progressiveClaimConfig'
import progressiveClaimModule from '../../ProgressiveClaim/progressiveClaimModule'
import getProgressiveClaimStatusColor from '../../ProgressiveClaim/utils/getProgressiveClaimStatusColor'
import { SalesOrder } from '../types'

interface ProgressiveClaimTabProps {
  salesOrder: SalesOrder
}

const ProgressiveClaimTab: React.FC<ProgressiveClaimTabProps> = (props) => {
  const { salesOrder } = props
  return (
    <CrudTable
      module={progressiveClaimModule}
      columnDefs={[
        { field: 'title', headerName: 'Claim ID' },
        {
          field: 'total',
          headerName: 'Amount Due',
          valueFormatter: ({ value }) => printAmount(value),
        },
        {
          field: 'total',
          headerName: 'Approved Sum',
          valueFormatter: ({ value }) => printAmount(value),
        },
        { field: 'assignee_id.title', headerName: 'Assignee' },
        { field: 'amount_paid' },
        { field: 'balance_fees', headerName: 'Bal. Fees' },
        {
          field: 'created_at',
          valueFormatter: ({ value }) =>
            value && dayjs(value).format('DD MMM YYYY'),
        },
        {
          field: 'status',
          cellRenderer: ({ value }) => (
            <StatusCell
              color={getProgressiveClaimStatusColor(value)}
              label={value}
            />
          ),
        },
      ]}
      setQuery={(q) => q.eq('sales_order_id', salesOrder.id)}
      previewFormSections={progressiveClaimPreviewFormSections}
      disableAdd
      disablePreview
    />
  )
}

export default ProgressiveClaimTab
