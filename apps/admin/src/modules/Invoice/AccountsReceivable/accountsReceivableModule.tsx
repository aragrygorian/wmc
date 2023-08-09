import { routes } from '@admin/app/routes'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import invoiceModule from '@admin/modules/Invoice/invoiceModule'

export const accountsReceivableModule = {
  sk: 'slug',
  table: {
    name: invoiceModule.table.name,
  },
  name: {
    singular: 'Accounts Receivable',
    plural: 'Accounts Receivable',
  },
  route: {
    plural: routes.ACCOUNTS_RECEIVABLE,
  },
  select: {
    list: '*',
  },
  Icon: CalculateOutlinedIcon,
}
