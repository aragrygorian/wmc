const getProjectStatusColor = (status: string): string => {
  switch (status) {
    case 'Pending':
      return '#2196f3'
    case 'Lost':
      return '#f44336'
    case 'Won':
      return '#4caf50'
    case 'Draft':
      return '#bdbdbd'
    default:
      return 'primary'
  }
}

export default getProjectStatusColor
