import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import { routes } from '@admin/app/routes'

const invoiceModule = {
  sk: 'slug',
  table: {
    name: 'invoice',
  },
  name: {
    singular: 'Invoice',
    plural: 'Invoices',
  },
  route: {
    plural: routes.INVOICES,
  },
  select: {
    list: '*, company:company_id(id, title, slug), sales_order(id, title, slug), assignee:assignee_id(*)',
    detail: `*,
      project:project_id(*),
      company:company_id(*),
      contact:contact_id(*),
      sales_order(*),
      assignee:assignee_id(*),
      payments:invoice_payment(*),
      credit_note(*),
      lines:invoice_line(*, product:product_id(*))`,
  },
  relations: {
    lines: { table: { name: 'invoice_line' } },
  },
  Icon: CalculateOutlinedIcon,
}

export default invoiceModule
