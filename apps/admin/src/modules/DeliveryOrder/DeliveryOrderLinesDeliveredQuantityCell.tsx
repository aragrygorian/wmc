import { Chip, Stack, Typography } from '@gravis-os/ui'
import React from 'react'

export interface DeliveryOrderLinesDeliveredQuantityCellProps {
  deliveredQuantity: number
  totalQuantity: number
}

const DeliveryOrderLinesDeliveredQuantityCell: React.FC<
  DeliveryOrderLinesDeliveredQuantityCellProps
> = (props): React.ReactElement => {
  const { deliveredQuantity, totalQuantity } = props
  const undeliveredQuantity = totalQuantity - deliveredQuantity
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="inherit">
        {deliveredQuantity}/{totalQuantity}
      </Typography>
      {undeliveredQuantity > 0 && (
        <Chip
          label={
            <Typography color="#F44336" variant="overline">
              Pending Qty {undeliveredQuantity}
            </Typography>
          }
          sx={{ bgcolor: '#FFF7F6 ! important' }}
          variant="filled"
        />
      )}
    </Stack>
  )
}

export default DeliveryOrderLinesDeliveredQuantityCell
