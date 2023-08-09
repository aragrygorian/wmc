import { green, orange, purple, red } from '@mui/material/colors'
import { ContactStatus } from '@prisma/client'

export const getContactStatusColor = (status: ContactStatus): string => {
  switch (status) {
    case 'New':
      return orange[500]
    case 'Qualified':
      return green[500]
    case 'Unqualified':
      return red[500]
    case 'Buyer':
      return purple[500]
    default:
      return 'primary'
  }
}
