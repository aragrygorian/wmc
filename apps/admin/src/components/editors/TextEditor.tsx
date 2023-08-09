import React, { forwardRef, memo } from 'react'
import { ICellEditorParams } from 'ag-grid-community'
import {
  ClickAwayListener,
  InputBase,
  InputBaseProps,
  Typography,
  TypographyProps,
} from '@mui/material'
import useCellEditor from './hooks/useCellEditor'
import WithToastValidation, {
  WithToastValidationProps,
} from './WithToastValidation'

export interface TextEditorProps extends ICellEditorParams {
  inputBaseProps?: Partial<InputBaseProps>
  typographyProps?: TypographyProps
  withToastValidationProps?: WithToastValidationProps
}

const TextEditor = forwardRef<unknown, TextEditorProps>(
  (props, forwardedRef) => {
    const {
      api,
      inputBaseProps,
      typographyProps,
      withToastValidationProps,
      formatValue,
    } = props

    const { value, setValue, ref, isEditing } = useCellEditor<string>({
      ref: forwardedRef,
      params: props,
    })

    if (!isEditing) {
      return (
        <WithToastValidation {...withToastValidationProps}>
          <Typography {...typographyProps}>
            {formatValue?.(value) || value}
          </Typography>
        </WithToastValidation>
      )
    }

    return (
      <ClickAwayListener onClickAway={() => api.stopEditing()}>
        <InputBase
          inputRef={ref}
          onChange={(event) => {
            setValue(event.target.value)
            inputBaseProps?.onChange?.(event)
          }}
          value={value}
          sx={{ px: 2, ...inputBaseProps?.sx }}
        />
      </ClickAwayListener>
    )
  }
)

export default memo(TextEditor)
