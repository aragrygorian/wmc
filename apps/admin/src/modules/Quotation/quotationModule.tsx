import { routes } from '@admin/app/routes'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'

export const quotationModule = {
  sk: 'slug',
  table: {
    name: 'quotation',
  },
  name: {
    singular: 'Quotation',
    plural: 'Quotations',
  },
  route: {
    plural: routes.QUOTATIONS,
  },
  select: {
    list: `*,
      assignee:assignee_id(*),
      project:project_id(id, title, slug),
      company:company_id(id, title, slug),
      contact:contact_id(id, title, slug)`,
    detail: `*,
      project:project_id(*,
        project_brand!project_id(*)
      ),
      company:company_id(*,
        company_brand!company_id(*)
      ),
      contact:contact_id(*),
      order(id, title),
      currency_factor(*,
        project_currency_factor!currency_factor_id(*)
      ),
      lines:quotation_line(*,
        product(*,
          brand(*,
            currency_factor(title, buy_rate, sell_rate),
            company:company_id(title, slug)
          ),
          category(title)
        )
      ),
      assignee:assignee_id(*, role(*))`,
  },
  relations: {
    lines: { table: { name: 'quotation_line' } },
    attachment_files: { table: { name: 'quotation_attachment_file' } },
  },
  Icon: CalculateOutlinedIcon,
}
