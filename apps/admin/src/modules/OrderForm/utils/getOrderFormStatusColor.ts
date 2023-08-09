const getOrderFormStatusColor = (status: string): string => {
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
      return '#d14343'
    case 'Void':
      return '#922e2e'
    default:
      return 'primary'
  }
}

export default getOrderFormStatusColor
