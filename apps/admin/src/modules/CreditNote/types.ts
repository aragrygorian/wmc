import {
  CreditNote as PrismaCreditNote,
  CreditNoteLine as PrismaCreditNoteLine,
} from '@prisma/client'

export interface CreditNoteLine extends PrismaCreditNoteLine {
  invoice: PrismaCreditNote
}

export interface CreditNote extends PrismaCreditNote {
  lines: CreditNoteLine[]
}
