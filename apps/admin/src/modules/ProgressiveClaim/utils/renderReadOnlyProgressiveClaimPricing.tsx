import React from 'react'
import { printAmount, printPercentage } from '@gravis-os/utils'
import { Stack, Typography } from '@mui/material'

const renderReadOnlyProgressiveClaimPricing = (props) => {
  const { label, name, value } = props
  const format = name.endsWith('rate') ? printPercentage : printAmount

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
        <Typography variant="subtitle1">{format(value)}</Typography>
      </Stack>
    </Stack>
  )
}

export default renderReadOnlyProgressiveClaimPricing
