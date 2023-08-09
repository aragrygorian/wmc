import find from 'lodash/find'
import flow from 'lodash/flow'

export interface Status {
  value: string
  color: string
}

export type StatusConfig = Status[]

export const getColorFromStatusConfig = (config: StatusConfig) =>
  flow(
    (value) => find(config, { value }),
    (status) => status?.color
  )
