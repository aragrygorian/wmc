import { Stack } from '@gravis-os/ui'
import { kebabCase, map, toString } from 'lodash'
import React from 'react'
import { PurchaseOrderLine } from '../utils/types'
import PurchaseOrderLineCard from './PurchaseOrderLineCard'

export interface PurchaseOrderLineCardListProps {
  lines: PurchaseOrderLine[]
}

const PurchaseOrderLineCardList: React.FC<PurchaseOrderLineCardListProps> = (
  props
): React.ReactElement => {
  const { lines } = props
  return (
    <Stack spacing={1}>
      {map(lines, (line) => (
        <PurchaseOrderLineCard
          key={`${kebabCase(toString(line.id))}-line-card`}
          line={line}
        />
      ))}
    </Stack>
  )
}

export default PurchaseOrderLineCardList
