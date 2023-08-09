import { find } from 'lodash'
import { useWatch } from 'react-hook-form'
import { ICellRendererParams } from 'ag-grid-community'

const useLinePriceValuePicker = (
  props: ICellRendererParams
): {
  supplierCostAmount?: number
  coefficientRate?: number
  handlingRate?: number
  currencyFactor?: { buy_rate: number }
  discountRate?: number
  additionalDiscountRate?: number
  markupRate?: number
  costingRate?: number
  marginRate?: number
} => {
  const { context, rowIndex, data } = props
  const [productId, projectProducts, projectBrands] = useWatch({
    name: [
      [context.name, rowIndex, 'product_id'].join('.'),
      'project_product_discounts',
      'project_brand_discounts',
    ],
  })
  const product = typeof productId === 'object' ? productId : data?.product
  const projectProduct = find(projectProducts, (projectProduct) => {
    const isSameProduct = projectProduct.product_id === product?.id
    const shouldApplyProductDiscount =
      projectProduct.project_brand &&
      !projectProduct.project_brand.discount_rate &&
      !projectProduct.project_brand.additional_discount_rate
    return isSameProduct && shouldApplyProductDiscount
  })
  const projectBrand = find(
    projectBrands,
    ({ brand_id: brandId }) => brandId === product?.brand_id
  )
  const supplierCostAmount = projectProduct
    ? projectProduct.supplier_cost_amount
    : product?.supplier_cost_amount
  const coefficientRate = projectBrand
    ? projectBrand.coefficient_rate
    : product?.brand?.coefficient_rate
  const markupRate = projectBrand
    ? projectBrand.markup_rate
    : product?.brand?.markup_rate
  const handlingRate = projectBrand
    ? projectBrand.handling_rate
    : product?.brand?.handling_rate
  const currencyFactor = projectBrand
    ? projectBrand.project_currency_factor
    : product?.brand?.currency_factor
  const discountRate = projectBrand ? null : product?.brand?.discount_rate
  const additionalDiscountRate = projectBrand
    ? null
    : product?.brand?.additional_discount_rate
  const costingRate = product?.brand?.costing_rate
  const marginRate = product?.brand?.margin_rate

  return {
    supplierCostAmount,
    coefficientRate,
    markupRate,
    handlingRate,
    currencyFactor,
    discountRate,
    additionalDiscountRate,
    costingRate,
    marginRate,
  }
}

export default useLinePriceValuePicker
