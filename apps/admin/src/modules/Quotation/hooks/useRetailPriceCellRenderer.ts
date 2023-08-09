import { ICellRendererParams } from 'ag-grid-community'
import { getRetailPriceAmount } from '@admin/modules/Product/productUtils'
import useLinePriceValuePicker from './useLinePriceValuePicker'

const useRetailPriceCellRenderer = (props: ICellRendererParams): number => {
  const {
    supplierCostAmount,
    coefficientRate,
    currencyFactor,
    discountRate,
    additionalDiscountRate,
    markupRate,
    marginRate,
  } = useLinePriceValuePicker(props)
  const retailPrice = getRetailPriceAmount({
    supplier_cost_amount: supplierCostAmount,
    margin_rate: marginRate,
    markup_rate: markupRate,
    coefficient_rate: coefficientRate,
    currency_factor: currencyFactor,
    discount_rate: discountRate,
    additional_discount_rate: additionalDiscountRate,
  })
  return retailPrice
}

export default useRetailPriceCellRenderer
