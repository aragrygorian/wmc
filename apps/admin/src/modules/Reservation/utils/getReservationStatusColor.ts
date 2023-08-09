import { green, grey, red } from '@mui/material/colors'
import { ReservationStatus } from '../types'

export const getReservationStatusColor = (
  status: ReservationStatus
): string => {
  switch (status) {
    case 'Stock arrived':
      return green[500]
    case 'Pending stock arrival':
      return red[500]
    default:
      return grey[500]
  }
}
