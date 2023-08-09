import React from 'react'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import { routes } from '@admin/app/routes'
import { ModelFieldWithCrud } from '@gravis-os/crud'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import dayjs from 'dayjs'
import { Stack, Typography } from '@gravis-os/ui'
import * as yup from 'yup'
import {
  companyAddFormSections,
  companyModule,
  companyPreviewFormSections,
} from '../Company/companyConfig'
import {
  contactAddFormSections,
  contactModule,
  contactPreviewFormSections,
} from '../Contact'
import {
  PublishedAtDisplayField,
  TitleDisplayField,
} from '../Quotation/components'
import {
  getBillingAddressFieldEffectByAddressKey,
  getIsBillingAddressFieldDisabled,
  getShippingAddressFieldEffectByAddressKey,
} from '../Quotation/utils'
import { getAssigneeField } from '../../utils/getUserField'
import AgingCounter from '../../components/AgingCounter'
import LoanFormLinesFieldArray from './LoanFormLinesFieldArray'

export const loanFormFormSections = [
  {
    key: 'assignee',
    title: 'Assignee',
    fields: [getAssigneeField()],
  },
  {
    key: 'status',
    title: 'Status',
    fields: [
      {
        key: 'status',
        name: 'status',
        type: 'input',
        options: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
      },
    ],
  },
  {
    key: 'title',
    title: 'Loan Form',
    fields: [<TitleDisplayField overline="Loan Form" />],
  },
  {
    key: 'published_at',
    title: 'Created At',
    fields: [<PublishedAtDisplayField overline="Created At" />],
  },
  {
    key: 'shipped_at',
    title: 'Created Date',
    renderReadOnly: ({ title, label }) => (
      <Stack spacing={1}>
        <Typography variant="overline" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h3">
          {dayjs(title).format('DD MMM YYYY').toString()}
        </Typography>
      </Stack>
    ),
    fields: [
      { key: 'due_at', name: 'due_at', label: 'Due Date', type: 'date' },
    ],
  },

  {
    key: 'company',
    title: 'Company',
    fields: [
      {
        key: 'company_id',
        name: 'company_id',
        type: 'model',
        module: companyModule,
        withCreate: true,
        select: '*',
        render: (props) => (
          <ModelFieldWithCrud
            {...props}
            module={companyModule}
            addFormSections={companyAddFormSections}
          />
        ),
      },
    ],
  },
  {
    key: 'contact',
    title: 'Contact',
    fields: [
      {
        key: 'contact_id',
        name: 'contact_id',
        type: 'model',
        module: contactModule,
        withCreate: true,
        select: '*',
        render: (props) => (
          <ModelFieldWithCrud
            {...props}
            module={contactModule}
            addFormSections={contactAddFormSections}
          />
        ),
      },
    ],
  },
  {
    key: 'shipping_address',
    title: 'Shipping Address',
    subtitle: 'Enter the shipping address',
    icon: <BallotOutlinedIcon />,
    fields: [
      {
        key: 'shipping_address_line_1',
        name: 'shipping_address_line_1',
        type: 'input',
        fieldEffect: getShippingAddressFieldEffectByAddressKey({
          addressKey: 'line_1',
        }),
      },
      {
        key: 'shipping_address_line_2',
        name: 'shipping_address_line_2',
        type: 'input',
        fieldEffect: getShippingAddressFieldEffectByAddressKey({
          addressKey: 'line_2',
        }),
      },
      {
        key: 'shipping_address_postal_code',
        name: 'shipping_address_postal_code',
        type: 'input',
        fieldEffect: getShippingAddressFieldEffectByAddressKey({
          addressKey: 'postal_code',
        }),
      },
      {
        key: 'shipping_address_city',
        name: 'shipping_address_city',
        type: 'input',
        fieldEffect: getShippingAddressFieldEffectByAddressKey({
          addressKey: 'city',
        }),
      },
      {
        key: 'shipping_address_country',
        name: 'shipping_address_country',
        type: 'input',
        fieldEffect: getShippingAddressFieldEffectByAddressKey({
          addressKey: 'country',
        }),
      },
      {
        key: 'is_billing_address_same_as_shipping_address',
        name: 'is_billing_address_same_as_shipping_address',
        type: 'switch',
      },
    ],
  },
  {
    key: 'billing_address',
    title: 'Billing Address',
    subtitle: 'Enter the billing address',
    icon: <BallotOutlinedIcon />,
    fields: [
      {
        key: 'billing_address_line_1',
        name: 'billing_address_line_1',
        type: 'input',
        fieldEffect: getBillingAddressFieldEffectByAddressKey({
          addressKey: 'line_1',
        }),
        disabled: getIsBillingAddressFieldDisabled,
      },
      {
        key: 'billing_address_line_2',
        name: 'billing_address_line_2',
        type: 'input',
        fieldEffect: getBillingAddressFieldEffectByAddressKey({
          addressKey: 'line_2',
        }),
        disabled: getIsBillingAddressFieldDisabled,
      },
      {
        key: 'billing_address_postal_code',
        name: 'billing_address_postal_code',
        type: 'input',
        fieldEffect: getBillingAddressFieldEffectByAddressKey({
          addressKey: 'postal_code',
        }),
        disabled: getIsBillingAddressFieldDisabled,
      },
      {
        key: 'billing_address_city',
        name: 'billing_address_city',
        type: 'input',
        fieldEffect: getBillingAddressFieldEffectByAddressKey({
          addressKey: 'city',
        }),
        disabled: getIsBillingAddressFieldDisabled,
      },
      {
        key: 'billing_address_country',
        name: 'billing_address_country',
        type: 'input',
        fieldEffect: getBillingAddressFieldEffectByAddressKey({
          addressKey: 'country',
        }),
        disabled: getIsBillingAddressFieldDisabled,
      },
    ],
  },
  {
    key: 'lines',
    title: 'Lines',
    fields: [<LoanFormLinesFieldArray />],
  },
  {
    key: 'notes',
    title: 'Total',
    fields: [
      { key: 'external_notes', name: 'external_notes', type: 'textarea' },
      { key: 'internal_notes', name: 'internal_notes', type: 'textarea' },
    ],
  },
]

export const loanFormModule = {
  sk: 'slug',
  table: {
    name: 'loan_form',
  },
  name: {
    singular: 'Loan Form',
    plural: 'Loan Forms',
  },
  route: {
    plural: routes.LOAN_FORMS,
  },
  select: {
    list: '*, project(id, title, slug), company(id, title, slug), contact(id, title, slug), assignee:assignee_id(*)',
    detail:
      '*, project(*), company(*), contact(*), lines:loan_form_line(*, product(*, brand(*, currency_factor(title, buy_rate, sell_rate), company:company_id(title, slug)), category(title)), warehouse(*))',
  },
  relations: {
    lines: { table: { name: 'loan_form_line' } },
  },
  Icon: CalculateOutlinedIcon,
}

export const loanFormPreviewFormSections = loanFormFormSections

export const loanFormColumnDefs = [
  { field: 'title' },
  {
    field: 'company.title',
    headerName: 'Company',
    module: companyModule,
    previewFormSections: companyPreviewFormSections,
  },
  {
    field: 'contact.title',
    headerName: 'Loan To',
    module: contactModule,
    previewFormSections: contactPreviewFormSections,
  },
  {
    field: 'aging',
    headerName: 'Aging',
    cellRenderer: AgingCounter,
    maxWidth: 100,
  },
  {
    field: 'due_at',
    headerName: 'Due At',
    valueFormatter: ({ value }) =>
      value ? dayjs(value).format('DD MMM YYYY') : '-',
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    valueFormatter: ({ value }) =>
      value ? dayjs(value).format('DD MMM YYYY') : '-',
  },
  {
    field: 'status',
    headerName: 'Status',
  },
]

export const loanFormFormSchema = yup.lazy((values) => {
  const { contact_id, company_id } = values
  return yup.object({
    due_at: yup.mixed().required('Due date is required'),
    contact_id: yup
      .mixed()
      [company_id ? 'optional' : 'required'](
        'Either Company or Contact is required'
      ),
    company_id: yup
      .mixed()
      [contact_id ? 'optional' : 'required'](
        'Either Company or Contact is required'
      ),
  })
})
