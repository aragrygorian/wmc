import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { ICellEditorReactComp } from 'ag-grid-react'
import { ICellEditorParams } from 'ag-grid-community'
import { mergeRefs } from 'react-merge-refs'
import { isEqual, isFunction } from 'lodash'

const useCellEditor = <T = unknown>({
  params,
  ref,
}: {
  ref: React.ForwardedRef<unknown>
  params: ICellEditorParams
}) => {
  const {
    value: initialValue = null,
    api,
    column,
    rowIndex,
    parseValue,
  } = params
  const [value, setValue] = useState<T | null>(initialValue)

  useEffect(() => {
    if (!isEqual(initialValue, value)) {
      setValue(initialValue)
    }
  }, [initialValue])

  useImperativeHandle<unknown, ICellEditorReactComp>(ref, () => {
    return {
      getValue() {
        return isFunction(parseValue) ? parseValue(value) : value
      },
    }
  })

  const inputRef = useRef<HTMLInputElement>(null)

  const isEditing = api
    .getEditingCells()
    .some(
      (cell) =>
        cell.rowIndex === rowIndex &&
        cell.column.getColId() === column.getColId()
    )

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus?.()
  }, [isEditing, inputRef.current])

  return {
    setValue,
    value,
    ref: mergeRefs([inputRef, ref]),
    isEditing,
  }
}

export default useCellEditor
