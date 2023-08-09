import React, { useEffect } from 'react'
import { Box, BoxProps } from '@gravis-os/ui'
import toast from 'react-hot-toast'

type ValidatorFn = () => boolean

export interface WithToastValidationProps extends BoxProps {
  helperText?: string
  validatorFns?: ValidatorFn | ValidatorFn[]
}

const WithToastValidation: React.FC<WithToastValidationProps> = (props) => {
  const {
    children,
    helperText = '',
    sx,
    validatorFns: injectedValidatorFns = [],
  } = props

  const validatorFns = Array.isArray(injectedValidatorFns)
    ? injectedValidatorFns
    : [injectedValidatorFns]
  const isValid = validatorFns.every((fn) => fn())

  useEffect(() => {
    if (!isValid) {
      toast.error(helperText)
    }
  }, [isValid])

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        px: 2,
        width: '100%',
        borderColor: isValid ? 'transparent' : 'error.main',
        borderStyle: 'solid',
        borderWidth: 2,
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default WithToastValidation
