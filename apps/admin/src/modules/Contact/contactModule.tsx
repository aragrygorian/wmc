import { routes } from '@admin/app/routes'
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined'

export const contactModule = {
  sk: 'slug',
  table: {
    name: 'contact',
  },
  name: {
    singular: 'Contact',
    plural: 'Contacts',
  },
  route: {
    plural: routes.CONTACTS,
  },
  select: {
    list: '*, company!company_id(*)',
    detail: '*, company!company_id(*)',
  },
  Icon: ContactPhoneOutlinedIcon,
}
