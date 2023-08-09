import { Box, Card, Stack, StatStack } from '@gravis-os/ui'
import HomeSectionHeader from '@admin/modules/Home/components/HomeSectionHeader'
import React from 'react'
import HomeStatLink from '@admin/modules/Home/components/HomeStatLink'
import SendIcon from '@mui/icons-material/SendOutlined'
import { getDocumentItemStatusKey } from '@admin/modules/Home/utils/getDocumentItemStatusKey'
import { deliveryInstructionModule } from '@admin/modules/DeliveryInstruction'
import {
  DELIVERY_INSTRUCTION_STATUS_COMPLETED,
  DELIVERY_INSTRUCTION_STATUS_PROCESSING,
} from '@admin/modules/DeliveryInstruction/constants'
import { useFetchDeliveryInstructionCount } from '@admin/modules/DeliveryInstruction/hooks/useFetchDeliveryInstruction'

const getStatusKey = getDocumentItemStatusKey(
  deliveryInstructionModule.name.singular
)

const useFetchDeliveryInstructionStatusCount = (status: string) =>
  useFetchDeliveryInstructionCount({
    select: '*',
    match: { status },
  })

const HomeProcurementTabDeliveryInstruction = () => {
  const { data: processingCount = 0 } = useFetchDeliveryInstructionStatusCount(
    DELIVERY_INSTRUCTION_STATUS_PROCESSING
  )

  const { data: completedCount = 0 } = useFetchDeliveryInstructionStatusCount(
    DELIVERY_INSTRUCTION_STATUS_COMPLETED
  )

  return (
    <>
      <HomeSectionHeader title="Pick & Pack" />

      <Stack spacing={2}>
        <Card>
          <StatStack
            reverse
            items={[
              {
                key: getStatusKey(DELIVERY_INSTRUCTION_STATUS_PROCESSING),
                title: processingCount.toString(),
                overline: DELIVERY_INSTRUCTION_STATUS_PROCESSING,
              },
              {
                key: getStatusKey(DELIVERY_INSTRUCTION_STATUS_COMPLETED),
                title: completedCount.toString(),
                overline: DELIVERY_INSTRUCTION_STATUS_COMPLETED,
              },
            ]}
          />
        </Card>
      </Stack>

      <Box>
        {[
          {
            title: `${processingCount} pick & pack processing`,
            status: DELIVERY_INSTRUCTION_STATUS_PROCESSING,
            show: Boolean(processingCount),
          },
        ].map(
          ({ show, status, title }) =>
            show && (
              <HomeStatLink
                href={`${deliveryInstructionModule.route.plural}?status=${status}`}
                startIcon={
                  <SendIcon fontSize="small" sx={{ color: 'grey.900' }} />
                }
                key={`${getStatusKey(status)}-link`}
              >
                {title}
              </HomeStatLink>
            )
        )}
      </Box>
    </>
  )
}

export default HomeProcurementTabDeliveryInstruction
