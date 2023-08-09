import { sumBy } from 'lodash'
import { getTaxAmount } from '../../Quotation/utils'
import { SupplierInvoice } from '../types'
import getLineTotal from '../../../utils/getLineTotal'

const getSupplierInvoiceOutstandingAmount = (
  supplierInvoice?: SupplierInvoice | null
) => {
  const subtotal = sumBy(supplierInvoice?.lines, getLineTotal)
  const tax = getTaxAmount(subtotal)
  const total = subtotal + tax
  const payments = sumBy(supplierInvoice?.payments, 'amount')
  return total - payments
}

export default getSupplierInvoiceOutstandingAmount
