import { UseObserveEffectOptions } from '@admin/hooks/useObserveEffect'
import { compact, find, maxBy } from 'lodash'

const getQuotationLineDiscountRate: UseObserveEffectOptions['getValue'] = (
  observedValues
) => {
  const [company, project, product, productId] = observedValues
  const nextProduct = typeof productId === 'object' ? productId : product
  const { company_brand: companyBrandDiscounts } = company || {}
  const { project_brand: projectBrandDiscounts } = project || {}
  const applicableDiscounts = compact([
    find(companyBrandDiscounts, { brand_id: nextProduct?.brand_id }),
    project && find(projectBrandDiscounts, { brand_id: nextProduct?.brand_id }),
  ])
  const getMergedDiscountRate = (
    discountRate: number,
    additionalDiscountRate: number
  ): number => 1 - (1 - discountRate) * (1 - additionalDiscountRate)
  const {
    discount_rate: discountRate = 0,
    additional_discount_rate: additionalDiscountRate = 0,
  } =
    maxBy(
      applicableDiscounts,
      ({
        discount_rate: discountRate = 0,
        additional_discount_rate: additionalDiscountRate = 0,
      }) => getMergedDiscountRate(discountRate, additionalDiscountRate)
    ) || {}
  const defaultDiscountRate = getMergedDiscountRate(
    discountRate,
    additionalDiscountRate
  )
  return defaultDiscountRate
}

export default getQuotationLineDiscountRate
