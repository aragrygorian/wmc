import { Box, Card, Stack, StatStack } from '@gravis-os/ui'
import React from 'react'
import SendIcon from '@mui/icons-material/SendOutlined'
import { useFetchQuotationCount } from '@admin/modules/Quotation/hooks/useFetchQuotations'
import {
  QUOTATION_STATUS_ACCEPTED,
  QUOTATION_STATUS_PENDING,
  QUOTATION_STATUS_PENDING_APPROVAL,
} from '@admin/modules/Quotation/constants'
import useUser from '@admin/app/useUser'
import { getDocumentItemStatusKey } from '@admin/modules/Home/utils/getDocumentItemStatusKey'
import { quotationModule } from '@admin/modules/Quotation/quotationModule'
import HomeStatLink from '../../HomeStatLink'
import HomeSectionHeader from '../../HomeSectionHeader'

const getStatusKey = getDocumentItemStatusKey(quotationModule.name.singular)

const useFetchQuotationStatusCount = (status: string) => {
  const { dbUser } = useUser()

  return useFetchQuotationCount({
    select: '*',
    match: { status, assignee_id: dbUser?.id },
  })
}

const HomeSalesTabQuotation = () => {
  const { data: pendingCount = 0 } = useFetchQuotationStatusCount(
    QUOTATION_STATUS_PENDING
  )

  const { data: pendingApprovalCount = 0 } = useFetchQuotationStatusCount(
    QUOTATION_STATUS_PENDING_APPROVAL
  )

  const { data: acceptedQuotationsCount = 0 } = useFetchQuotationStatusCount(
    QUOTATION_STATUS_ACCEPTED
  )

  return (
    <>
      <HomeSectionHeader title="Quotation" />

      <Stack spacing={2}>
        <Card>
          <StatStack
            reverse
            items={[
              {
                key: getStatusKey(QUOTATION_STATUS_PENDING),
                title: pendingCount.toString(),
                overline: QUOTATION_STATUS_PENDING,
              },
              {
                key: getStatusKey(QUOTATION_STATUS_PENDING_APPROVAL),
                title: pendingApprovalCount.toString(),
                overline: QUOTATION_STATUS_PENDING_APPROVAL,
              },
              {
                key: getStatusKey(QUOTATION_STATUS_ACCEPTED),
                title: acceptedQuotationsCount.toString(),
                overline: QUOTATION_STATUS_ACCEPTED,
              },
            ]}
          />
        </Card>

        <Box>
          {[
            {
              title: `[Reminder] ${pendingCount} quotations to be sent`,
              status: QUOTATION_STATUS_PENDING,
              show: Boolean(pendingCount),
            },
            {
              title: `${pendingApprovalCount} quotations pending approval`,
              status: QUOTATION_STATUS_PENDING_APPROVAL,
              show: Boolean(pendingApprovalCount),
            },
          ].map(
            ({ show, status, title }) =>
              show && (
                <HomeStatLink
                  href={`${quotationModule.route.plural}?status=${status}`}
                  startIcon={
                    <SendIcon fontSize="small" sx={{ color: 'grey.500' }} />
                  }
                  key={`${getStatusKey(status)}-link`}
                >
                  {title}
                </HomeStatLink>
              )
          )}
        </Box>
      </Stack>
    </>
  )
}

export default HomeSalesTabQuotation
