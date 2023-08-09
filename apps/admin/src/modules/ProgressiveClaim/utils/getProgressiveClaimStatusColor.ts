const getProgressiveClaimStatusColor = (status: string): string => {
  switch (status) {
    case 'New':
      return '#134b63'
    default:
      return 'primary'
  }
}

export default getProgressiveClaimStatusColor
