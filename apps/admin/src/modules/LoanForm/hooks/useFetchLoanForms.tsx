import initUseFetchCount from '@admin/lib/useFetch/useFetchCount'
import { initUseFetch } from '../../../lib/useFetch'
import { LoanForm } from '../types'
import { loanFormModule } from '../loanFormConfig'

export const useFetchLoanForms = initUseFetch<LoanForm>(loanFormModule)

export const useFetchLoanFormsCount = initUseFetchCount(loanFormModule)
