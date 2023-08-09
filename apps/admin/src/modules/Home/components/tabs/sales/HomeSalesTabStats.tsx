import React from 'react'
import { Card, StatStack } from '@gravis-os/ui'
import useUser from '@admin/app/useUser'
import { useFetchQuotations } from '@admin/modules/Quotation/hooks/useFetchQuotations'
import { useFetchInvoices } from '@admin/modules/Invoice/hooks/useFetchInvoices'
import { curryRight, filter, sumBy } from 'lodash'
import { QUOTATION_STATUS_ACCEPTED } from '@admin/modules/Quotation/constants'

interface HomeSalesTabStatsProps {}

const sumByTotal: any = curryRight(sumBy)('total')

const HomeSalesTabStats: React.FC<HomeSalesTabStatsProps> = () => {
  const { dbUser } = useUser()

  const { data: quotations = [] } = useFetchQuotations({
    select: '*',
    match: { assignee_id: dbUser?.id },
  })

  const { data: invoices = [] } = useFetchInvoices({
    select: '*',
    match: { assignee_id: dbUser?.id },
  })

  return (
    <Card>
      <StatStack
        reverse
        items={[
          {
            key: 'sales_total',
            title: sumByTotal(
              filter(quotations, { status: QUOTATION_STATUS_ACCEPTED })
            ),
            overline: 'Sales Total',
            titleTypographyProps: { sx: { color: 'success.main' } },
          },
          {
            key: 'stats-quotation-quantity',
            title: quotations.length.toString(),
            overline: 'Quotation Quantity',
          },
          {
            key: 'quotation_total',
            title: sumByTotal(quotations),
            overline: 'Quotation Total',
          },
          {
            key: 'invoice_quantity',
            title: invoices.length.toString(),
            overline: 'Invoice Quantity',
          },
          {
            key: 'invoice_total',
            title: sumByTotal(invoices),
            overline: 'Invoice Total',
          },
        ]}
      />
    </Card>
  )
}

export default HomeSalesTabStats
