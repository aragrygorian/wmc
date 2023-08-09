const getDeliveryOrderStatusColor = (status: string): string => {
  switch (status) {
    case 'Pending':
      return '#2196f3'
    case 'New':
      return '#134b63'
    case 'Delivered':
      return '#4caf50'
    default:
      return 'primary'
  }
}

export default getDeliveryOrderStatusColor
