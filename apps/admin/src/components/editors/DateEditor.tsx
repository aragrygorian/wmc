import React, { forwardRef, memo } from 'react'
import { ICellEditorParams } from 'ag-grid-community'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import {
  ClickAwayListener,
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
} from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import useCellEditor from './hooks/useCellEditor'

interface DateEditorProps extends ICellEditorParams {
  datePickerProps?: Partial<DatePickerProps<Dayjs, Date>>
  textFieldProps?: Partial<TextFieldProps>
  typographyProps?: TypographyProps
}

const DateEditor = forwardRef<unknown, DateEditorProps>(
  (props, forwardedRef) => {
    const { api, datePickerProps, textFieldProps, typographyProps } = props

    const { value, setValue, ref, isEditing } = useCellEditor<Dayjs>({
      ref: forwardedRef,
      params: props,
    })

    if (!isEditing) {
      return (
        <Typography px={2} {...typographyProps}>
          {value?.format('DD MMM YYYY')}
        </Typography>
      )
    }

    return (
      <DatePicker
        inputRef={ref}
        onChange={(date) => date && setValue(dayjs(date))}
        value={value}
        renderInput={(props) => (
          <ClickAwayListener onClickAway={() => api.stopEditing()}>
            <TextField
              {...(props as TextFieldProps)}
              {...(textFieldProps as TextFieldProps)}
              onChange={(event) => {
                props.onChange?.(event)
                textFieldProps?.onChange?.(event)
              }}
              onBlur={(event) => {
                props.onBlur?.(event)
                textFieldProps?.onBlur?.(event)
              }}
            />
          </ClickAwayListener>
        )}
        inputFormat="dd MMM yyyy"
        open={isEditing}
        {...datePickerProps}
      />
    )
  }
)

export default memo(DateEditor)
