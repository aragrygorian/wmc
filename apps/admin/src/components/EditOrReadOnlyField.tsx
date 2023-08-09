import React from 'react'
import { Stack, Typography } from '@mui/material'
import {
  ControlledAmountField,
  ControlledTextField,
  ControlledTextFieldProps,
} from '@gravis-os/fields'
import { FormSectionFieldTypeEnum } from '@gravis-os/form'
import { useFormContext } from 'react-hook-form'
import { isNil } from 'lodash'

const getFieldComponent = (type: FormSectionFieldTypeEnum) => {
  switch (type) {
    case FormSectionFieldTypeEnum.AMOUNT:
      return ControlledAmountField
    case FormSectionFieldTypeEnum.PERCENTAGE:
    case FormSectionFieldTypeEnum.TEXT:
    default:
      return ControlledTextField
  }
}

export interface EditOrReadOnlyFieldProps extends ControlledTextFieldProps {
  name: string
  value?: string | number
  type?: FormSectionFieldTypeEnum
  formatValue?: (value?: string | number) => React.ReactNode
  isReadOnly?: boolean
  formContext?: ReturnType<typeof useFormContext>
}

/**
 * EditOrReadOnlyField has to be used within RHF's FormContext
 * @param props
 */
const EditOrReadOnlyField: React.FC<EditOrReadOnlyFieldProps> = (props) => {
  const { formContext } = props
  const { control, getValues } = formContext

  const {
    name,
    type = FormSectionFieldTypeEnum.TEXT,
    label,
    value,
    formatValue,
    isReadOnly,
    ...rest
  } = props
  const defaultValue = getValues(name)

  if (isReadOnly) {
    const readOnlyValue = isNil(value) ? defaultValue : value
    return (
      <Stack spacing={1}>
        <Stack
          spacing={0.5}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="overline" color="text.secondary">
            {label || name}
          </Typography>
          <Typography variant="subtitle1">
            {typeof formatValue === 'function'
              ? formatValue(readOnlyValue)
              : readOnlyValue}
          </Typography>
        </Stack>
      </Stack>
    )
  }

  const ControlledField = getFieldComponent(type)

  return (
    <ControlledField
      control={control}
      name={name}
      value={value}
      label={label}
      defaultValue={defaultValue}
      {...rest}
    />
  )
}

export default EditOrReadOnlyField
