import { appConfig } from '@admin/app/config'

const getTaxAmount = (value: number) => {
  if (!value || Number.isNaN(value)) return 0

  return value * appConfig.taxRate
}

export default getTaxAmount
