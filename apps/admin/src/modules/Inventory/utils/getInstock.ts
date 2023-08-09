import { Inventory } from '@prisma/client'
import { sumBy } from 'lodash'

export const getInstock = (inventory: Inventory[] = []) =>
  sumBy(inventory, ({ in: inbound, out: outbound }) => inbound - outbound)
