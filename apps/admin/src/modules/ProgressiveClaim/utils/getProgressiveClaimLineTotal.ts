import { ProgressiveClaimLine } from '../types'

const getProgressiveClaimLineTotal = ({
  approved_quantity: approvedQuantity,
  unit_price: unitPrice,
}: Pick<ProgressiveClaimLine, 'approved_quantity' | 'unit_price'>) =>
  (unitPrice || 0) * (approvedQuantity || 0)

export default getProgressiveClaimLineTotal
