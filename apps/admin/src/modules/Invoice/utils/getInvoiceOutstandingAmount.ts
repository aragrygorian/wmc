import { sumBy } from 'lodash'
import { getTaxAmount } from '../../Quotation/utils'
import { Invoice } from '../types'
import getLineTotal from '../../../utils/getLineTotal'

const getInvoiceOutstandingAmount = (supplierInvoice?: Invoice | null) => {
  const subtotal = sumBy(supplierInvoice?.lines, getLineTotal)
  const tax = getTaxAmount(subtotal)
  const total = subtotal + tax
  const payments = sumBy(supplierInvoice?.payments, 'amount')
  return total - payments
}

export default getInvoiceOutstandingAmount
