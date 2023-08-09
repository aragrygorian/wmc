import { routes } from '@admin/app/routes'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import { supplierInvoiceModule } from '@admin/modules/SupplierInvoice/supplierInvoiceConfig'

export const accountsPayableModule = {
  sk: 'slug',
  table: {
    name: supplierInvoiceModule.table.name,
  },
  name: {
    singular: 'Accounts Payable',
    plural: 'Accounts Payable',
  },
  route: {
    plural: routes.ACCOUNTS_PAYABLE,
  },
  select: {
    list: '*',
  },
  Icon: CalculateOutlinedIcon,
}
