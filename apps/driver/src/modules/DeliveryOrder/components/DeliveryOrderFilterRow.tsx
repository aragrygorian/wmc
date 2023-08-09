import { Chip, Grid } from '@gravis-os/ui'
import { kebabCase, map } from 'lodash'
import React from 'react'

export interface DeliveryOrderFilterRowItemProps {
  title: string
  filterKey: string
}

export interface DeliveryOrderFilterRowProps {
  items: DeliveryOrderFilterRowItemProps[]
  onDelete: (key: string) => void
}

const DeliveryOrderFilterRow: React.FC<DeliveryOrderFilterRowProps> = (
  props
): React.ReactElement => {
  const { items, onDelete } = props
  return (
    <Grid container>
      {map(items, (item) => {
        const { title, filterKey } = item
        return (
          <Grid item xs key={`${kebabCase(title)}-filter-key`}>
            <Chip
              title={`${filterKey}: ${title}`}
              clickable
              onDelete={() => onDelete(filterKey)}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default DeliveryOrderFilterRow
