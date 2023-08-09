import React, { forwardRef, memo } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { mergeRefs } from 'react-merge-refs'
import DateEditor from './DateEditor'

export interface ControlledDateEditorProps
  extends React.ComponentProps<typeof DateEditor> {
  name?: string
}

const ControlledDateEditor = forwardRef<unknown, ControlledDateEditorProps>(
  (props, ref) => {
    const { name, value: defaultValue, textFieldProps, ...rest } = props
    const { control } = useFormContext()

    const {
      field: { value, ref: controllerRef, ...fieldProps },
    } = useController({
      name: name ?? '',
      control,
      defaultValue,
    })

    return (
      <DateEditor
        {...rest}
        ref={mergeRefs([controllerRef, ref])}
        textFieldProps={{ ...fieldProps, ...textFieldProps }}
        value={value}
      />
    )
  }
)

export default memo(ControlledDateEditor)
