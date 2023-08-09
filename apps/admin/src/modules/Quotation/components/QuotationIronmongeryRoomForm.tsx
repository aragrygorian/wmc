import { TextField } from '@gravis-os/fields'
import { Grid, Stack } from '@gravis-os/ui'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { kebabCase, map, size, startCase } from 'lodash'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  DOOR_HARDWARE_OPTIONS,
  DOOR_MATERIAL_OPTIONS,
  DOOR_TYPE_OPTIONS,
} from '../constants'

export interface QuotationIronmongeryRoomFormProps {}

interface FormRowProps {
  name: string
  type: string
  disabled?: boolean
  defaultValue?: string
  options?: string[]
}

/* Form Rows */
const FORM_FIRST_ROW: FormRowProps[] = [
  { name: 'doorLocation', type: 'text' },
  { name: 'door', type: 'number' },
  { name: 'quantity', type: 'number' },
]
const FORM_SECOND_ROW: FormRowProps[] = [
  { name: 'width', type: 'number' },
  { name: 'thickness', type: 'number' },
  { name: 'height', type: 'number' },
  { name: 'unit', type: 'text', disabled: true, defaultValue: 'mm' },
]
const FORM_THIRD_ROW: FormRowProps[] = [
  { name: 'doorType', type: 'text', options: DOOR_TYPE_OPTIONS },
  { name: 'doorMaterial', type: 'text', options: DOOR_MATERIAL_OPTIONS },
  { name: 'doorHardware', type: 'text', options: DOOR_HARDWARE_OPTIONS },
]

const QuotationIronmongeryRoomForm: React.FC<
  QuotationIronmongeryRoomFormProps
> = (): React.ReactElement => {
  /* Form Context */
  const { control } = useFormContext()

  return (
    <form>
      <Stack spacing={2}>
        <Grid container>
          {/* First and Second Rows */}
          {map([FORM_FIRST_ROW, FORM_SECOND_ROW], (row) =>
            map(row, (field) => (
              <Grid item xs={12 / size(row)} key={kebabCase(field.name)}>
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      onChange={onChange}
                      value={value}
                      type={field.type}
                      disabled={field.disabled}
                      defaultValue={field.defaultValue}
                      label={startCase(field.name)}
                    />
                  )}
                />
              </Grid>
            ))
          )}
          {/* Third Row */}
          {map(FORM_THIRD_ROW, (field) => (
            <Grid
              item
              xs={12 / size(FORM_THIRD_ROW)}
              key={kebabCase(field.name)}
            >
              <Controller
                name={field.name}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControl fullWidth>
                    <InputLabel id={`${field.name}-select-label`}>
                      {startCase(field.name)}
                    </InputLabel>
                    <Select
                      onChange={onChange}
                      value={value}
                      labelId={`${field.name}-select-label`}
                      label={startCase(field.name)}
                    >
                      {map(field.options, (option) => (
                        <MenuItem
                          key={`${option}-menu-item-key`}
                          value={option}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </form>
  )
}

export default QuotationIronmongeryRoomForm
