import { getSalespersonCostAmount } from '@admin/modules/Product/productUtils'
import { ICellRendererParams } from 'ag-grid-community'
import useLinePriceValuePicker from './useLinePriceValuePicker'

const useSalesPersonCostCellRenderer = (props: ICellRendererParams): number => {
  const {
    supplierCostAmount,
    coefficientRate,
    currencyFactor,
    discountRate,
    additionalDiscountRate,
    marginRate,
    markupRate,
  } = useLinePriceValuePicker(props)
  const salesPersonCost = getSalespersonCostAmount({
    supplier_cost_amount: supplierCostAmount,
    margin_rate: marginRate,
    markup_rate: markupRate,
    coefficient_rate: coefficientRate,
    currency_factor: currencyFactor,
    discount_rate: discountRate,
    additional_discount_rate: additionalDiscountRate,
  })
  return salesPersonCost
}

export default useSalesPersonCostCellRenderer
