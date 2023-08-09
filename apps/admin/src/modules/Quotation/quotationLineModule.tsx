import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'

export const quotationLineModule = {
  sk: 'slug',
  table: {
    name: 'quotation_line',
  },
  name: {
    singular: 'Quotation Line',
    plural: 'Quotation Lines',
  },
  select: {
    list: '*, quotation(*)',
    detail:
      '*, quotation(*, project(*, project_brand!project_id(*), brand(*)))',
  },
  Icon: CategoryOutlinedIcon,
}
