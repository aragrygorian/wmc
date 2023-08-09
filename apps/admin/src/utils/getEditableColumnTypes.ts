import { ColDef } from 'ag-grid-community'
import ControlledTextEditor from '../components/editors/ControlledTextEditor'

type EditableColumnType = 'editableTextColumn' | 'editableNumberColumn'

const getEditableColumnTypeDef = (options?: ColDef) => ({
  editable: true,
  cellEditor: ControlledTextEditor,
  cellRenderer: ControlledTextEditor,
  cellStyle: { padding: 0, height: '100%' },
  ...options,
})

// @link: https://www.ag-grid.com/react-data-grid/change-detection/
export const getEditableColumnTypes = (
  options?: ColDef
): Record<EditableColumnType, ColDef> => {
  return {
    editableTextColumn: getEditableColumnTypeDef({
      ...options,
      filter: 'agTextColumnFilter',
    }),
    editableNumberColumn: getEditableColumnTypeDef({
      ...options,
      filter: 'agNumberColumnFilter',
      valueParser: 'Number(newValue)',
    }),
  }
}
