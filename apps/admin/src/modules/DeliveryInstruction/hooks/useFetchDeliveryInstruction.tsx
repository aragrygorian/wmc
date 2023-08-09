import { initUseFetch } from '@admin/lib/useFetch'
import { deliveryInstructionModule } from '@admin/modules/DeliveryInstruction'
import { DeliveryInstruction } from '@admin/modules/DeliveryInstruction/types'
import initUseFetchCount from '../../../lib/useFetch/useFetchCount'

export const useFetchDeliveryInstructions = initUseFetch<DeliveryInstruction>(
  deliveryInstructionModule
)

export const useFetchDeliveryInstructionCount = initUseFetchCount(
  deliveryInstructionModule
)
