import React, { forwardRef, memo } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { mergeRefs } from 'react-merge-refs'
import TextEditor from './TextEditor'

export interface ControlledTextEditorProps
  extends React.ComponentProps<typeof TextEditor> {
  name?: string
}

const ControlledTextEditor = forwardRef<unknown, ControlledTextEditorProps>(
  (props, ref) => {
    const { name, value: defaultValue, inputBaseProps, ...rest } = props
    const { control } = useFormContext()
    const { rowIndex, context } = rest

    const {
      field: { value, ref: controllerRef, ...fieldProps },
    } = useController({
      name: `${context.name}.${rowIndex}.${name}`,
      control,
      defaultValue,
    })

    return (
      <TextEditor
        {...rest}
        ref={mergeRefs([controllerRef, ref])}
        inputBaseProps={{ ...fieldProps, ...inputBaseProps }}
        value={value}
      />
    )
  }
)

export default memo(ControlledTextEditor)
