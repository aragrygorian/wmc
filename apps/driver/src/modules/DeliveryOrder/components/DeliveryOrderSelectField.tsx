import { Stack } from '@gravis-os/ui'
import { FormHelperText, MenuItem, Select, SelectProps } from '@mui/material'
import { isUndefined, map } from 'lodash'
import React from 'react'

export interface DeliveryOrderSelectFieldItemProps {
  key: string
  value: string
  title: string
}

export interface DeliveryOrderSelectFieldProps extends SelectProps {
  key: string
  label?: string
  items: DeliveryOrderSelectFieldItemProps[]
}

const DeliveryOrderSelectField: React.FC<DeliveryOrderSelectFieldProps> = (
  props
): React.ReactElement => {
  const { key, label, items, ...rest } = props
  return (
    <Stack key={key} spacing={0.5}>
      {!isUndefined(label) && <FormHelperText>{label}</FormHelperText>}
      <Select {...rest}>
        {map(items, (item) => {
          const { key, value, title } = item
          return (
            <MenuItem key={key} value={value}>
              {title}
            </MenuItem>
          )
        })}
      </Select>
    </Stack>
  )
}

export default DeliveryOrderSelectField
