import { useWatch } from 'react-hook-form'
import { ICellRendererParams } from 'ag-grid-community'
import useNetRetailPriceCellRenderer from './useNetRetailPriceCellRenderer'

const useLineTotalCellRenderer = (props: ICellRendererParams): number => {
  const { context, rowIndex } = props
  const [quantity] = useWatch({
    name: [[context.name, rowIndex, 'quantity'].join('.')],
  })
  const netRetailPrice = useNetRetailPriceCellRenderer(props)

  return netRetailPrice * (quantity || 0)
}

export default useLineTotalCellRenderer
