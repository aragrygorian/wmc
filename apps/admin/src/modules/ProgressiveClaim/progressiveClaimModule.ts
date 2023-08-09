import { routes } from '@admin/app/routes'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'

const progressiveClaimModule = {
  Icon: CalculateOutlinedIcon,
  sk: 'slug',
  table: {
    name: 'progressive_claim',
  },
  name: {
    singular: 'Progressive Claim',
    plural: 'Progressive Claims',
  },
  route: {
    plural: routes.PROGRESSIVE_CLAIMS,
  },
  select: {
    list: `*,
      project(id, title, slug),
      company(id, title, slug),
      assignee:assignee_id(*),
      sales_order(*,
        lines:sales_order_line(*,
          product:product_id(*,
            brand(*,
              currency_factor(title, buy_rate, sell_rate)
            )
          )
        )
      ),
      lines:progressive_claim_line(*)`,
    detail: `*,
      project(*),
      company(*),
      contact(*),
      assignee:assignee_id(*),
      sales_order(*,
        lines:sales_order_line(*,
          product:product_id(*,
            brand(*,
              currency_factor(title, buy_rate, sell_rate)
            )
          )  
        )
      ),
      lines:progressive_claim_line(*,
        product(*),
        sales_order_line(*,
          progressive_claim_line(*)
        )
      ),
      attachment_files:progressive_claim_attachment_file(*)`,
  },
  relations: {
    lines: { table: { name: 'progressive_claim_line' } },
    attachment_files: { table: { name: 'progressive_claim_attachment_file' } },
  },
}

export default progressiveClaimModule
