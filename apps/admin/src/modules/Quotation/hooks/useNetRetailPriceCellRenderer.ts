import { useWatch } from 'react-hook-form'
import { ICellRendererParams } from 'ag-grid-community'
import getNetRetailPrice from '../utils/pricing/getNetRetailPrice'
import useRetailPriceCellRenderer from './useRetailPriceCellRenderer'

const useNetRetailPriceCellRenderer = (props: ICellRendererParams): number => {
  const { context, rowIndex } = props
  const [discountRate] = useWatch({
    name: [[context.name, rowIndex, 'discount_rate'].join('.')],
  })
  const retailPrice = useRetailPriceCellRenderer(props)

  return getNetRetailPrice({ retailPrice, discountRate })
}

export default useNetRetailPriceCellRenderer
