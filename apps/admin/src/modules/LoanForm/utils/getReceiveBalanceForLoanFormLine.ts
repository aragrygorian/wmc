import { Inventory } from '@prisma/client'
import { groupBy, sumBy } from 'lodash'
import { LoanFormLine } from '../types'

export const getReceiveBalanceForLoanFormLine = (
  loanFormLine: LoanFormLine,
  inventories: Inventory[]
): number => {
  const groupedInventories = groupBy(inventories, 'loan_form_line_id')

  return sumBy(
    groupedInventories[loanFormLine.id],
    (inventory) => inventory.out - inventory.in
  )
}
