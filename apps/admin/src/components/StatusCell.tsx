import React from 'react'
import { Chip, ChipProps } from '@gravis-os/ui'

interface StatusCellProps extends ChipProps {
  color?: string
  label: string
}

const DEFAULT_COLOR = 'status.gray.main'

const StatusCell: React.FC<StatusCellProps> = (props) => {
  const { label, color = DEFAULT_COLOR, ...rest } = props

  if (!label) return null

  return (
    <Chip
      label={label}
      {...rest}
      sx={{
        borderRadius: 1,
        '&.MuiChip-filledDefault': { backgroundColor: color },
        '& > .MuiChip-label': { color: 'common.white' },
        ...rest?.sx,
      }}
    />
  )
}

export default StatusCell
