import { QuotationLine } from '@admin/modules/Quotation/types'
import { getRetailPriceAmount } from '../../Product/productUtils'

const getNetUnitPriceFromLine = (
  line: Pick<QuotationLine, 'product' | 'discount_rate'>,
  disableDiscountRate?: boolean
) => {
  const { product, discount_rate: discountRate } = line || {}
  const retailPriceAmount = getRetailPriceAmount({
    ...product,
    ...product?.brand,
  })
  return (
    (retailPriceAmount || 0) *
    (disableDiscountRate ? 1 : 1 - (discountRate ?? 0))
  )
}

export default getNetUnitPriceFromLine
