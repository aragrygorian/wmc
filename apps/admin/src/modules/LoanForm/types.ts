import {
  LoanForm as PrismaLoanForm,
  LoanFormLine as PrismaLoanFormLine,
} from '@prisma/client'
import { Warehouse } from '../Warehouse/types'
import { Product } from '../Product/types'

export interface LoanForm extends PrismaLoanForm {
  lines?: LoanFormLine[]
}

export interface LoanFormLine extends PrismaLoanFormLine {
  product?: Product
  warehouse?: Warehouse
}
