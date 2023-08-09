import React, { useEffect, useRef, useState } from 'react'
import {
  IconButton,
  InputAdornment,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { over } from 'lodash'
import NumberFormat from 'react-number-format'
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
import { useController, useFormContext } from 'react-hook-form'
import { printAmount, printPercentage } from '@gravis-os/utils'
import useModalState from '@admin/hooks/useModalState'

interface AdditionalDiscountFieldProps {
  isReadOnly?: boolean
  formContext?: ReturnType<typeof useFormContext>
}

const AdditionalDiscountField: React.FC<AdditionalDiscountFieldProps> = (
  props
) => {
  const { isReadOnly, formContext } = props
  const { control } = formContext

  const {
    field: { value: discountRate, onChange: onChangeDiscountRate },
  } = useController({
    name: 'discount_rate',
    control,
  })
  const {
    field: { value: discount, onChange: onChangeDiscount },
  } = useController({
    name: 'discount',
    control,
  })
  const {
    field: { onChange: handleChangeIsDiscountRate, value: isDiscountRate },
  } = useController({
    name: 'is_discount_rate',
    control,
    defaultValue: true,
  })
  const label = isDiscountRate ? 'Discount Rate' : 'Discount'
  const value = isDiscountRate ? discountRate : discount
  const onChange = over([
    onChangeDiscount,
    (value) => onChangeDiscountRate(value / 100),
  ])

  const anchorRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useModalState()
  const handleOpen = () => setIsMenuOpen(true)
  const handleClose = () => setIsMenuOpen(false)

  const [displayValue, setDisplayValue] = useState(value)
  useEffect(() => {
    setDisplayValue(isDiscountRate ? value * 100 : value)
  }, [value])

  const handleChoosePercentage = over([
    () => handleChangeIsDiscountRate(true),
    handleClose,
  ])
  const handleChooseAbsolute = over([
    () => handleChangeIsDiscountRate(false),
    handleClose,
  ])

  if (isReadOnly) {
    const readOnlyValue = isDiscountRate
      ? printPercentage(value)
      : printAmount(value)
    return (
      <Stack spacing={1}>
        <Stack
          spacing={0.5}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="overline" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="subtitle1">{readOnlyValue}</Typography>
        </Stack>
      </Stack>
    )
  }

  return (
    <div ref={anchorRef}>
      <NumberFormat
        customInput={TextField}
        value={displayValue}
        fullWidth
        thousandSeparator
        decimalScale={2}
        onValueChange={(target) => {
          if (target.floatValue === displayValue) return
          setDisplayValue(target.floatValue)
          onChange(target.floatValue ?? 0)
        }}
        isNumericString
        prefix={isDiscountRate ? '' : '$ '}
        suffix={isDiscountRate ? '%' : ''}
        label={label}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleOpen}>
                <ArrowDropDownOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Popover
        open={isMenuOpen}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleClose}
      >
        <MenuList autoFocusItem={isMenuOpen} onKeyDown={handleClose}>
          <MenuItem onClick={handleChooseAbsolute}>
            <AttachMoneyOutlinedIcon />
          </MenuItem>
          <MenuItem onClick={handleChoosePercentage}>
            <PercentOutlinedIcon />
          </MenuItem>
        </MenuList>
      </Popover>
    </div>
  )
}

export default AdditionalDiscountField
