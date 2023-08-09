import { ListItemProps } from '@gravis-os/ui'
import { routes } from './routes'

const navConfig: ListItemProps[] = [
  { key: 'home', title: 'Home', href: routes.HOME },
  { key: 'pick-and-pack', title: 'Pick and Pack', href: routes.PICK_AND_PACK },
  {
    key: 'purchase-order',
    title: 'Purchase Order',
    href: routes.PURCHASE_ORDER,
  },
]

export default navConfig
