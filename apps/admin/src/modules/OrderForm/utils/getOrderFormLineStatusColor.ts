const getOrderFormLineStatusColor = (status: string): string => {
  switch (status) {
    case 'New':
      return '#134b63'
    case 'Completed':
      return 'success.main'
    case 'Pending PO':
      return '#9b51e0'
    case 'Pending Stock':
      return '#c77700'
    case 'Overdue':
      return 'error.main'
    case 'Void':
      return 'error.dark'
    default:
      return 'primary'
  }
}

export default getOrderFormLineStatusColor
