import React from 'react'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import { printAmount } from '@gravis-os/utils'
import { routes } from '@admin/app/routes'
import { ModelFieldWithCrud } from '@gravis-os/crud'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import { FormSectionProps } from '@gravis-os/form'
import dayjs from 'dayjs'
import { projectAddFormSections, projectModule } from '../Project/projectConfig'
import { companyAddFormSections, companyModule } from '../Company/companyConfig'
import { contactAddFormSections, contactModule } from '../Contact'
import { TitleDisplayField } from '../Quotation/components'
import getBillingAddressFieldEffectByAddressKey from './utils/getBillingAddressFieldEffectByAddressKey'
import { getAssigneeField } from '../../utils/getUserField'
import CreditNoteLinesFieldArray from './components/CreditNoteLinesFieldArray'
import invoiceModule from '../Invoice/invoiceModule'
import UserCell from '../../components/UserCell'
import ModuleLink from '../../components/ModuleLink'
import TotalDisplayField from '../../components/TotalDisplayField'
import CreditNoteTotalField from './components/CreditNoteTotalField'

export const creditNoteFormSections: FormSectionProps[] = [
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
    title: 'Credit Note',
    fields: [<TitleDisplayField overline="Credit Note" />],
  },
  {
    key: 'published_at',
    title: 'Credit Note Date',
    fields: [
      {
        key: 'published_at',
        name: 'published_at',
        type: 'date',
        label: 'Credit Note Date',
      },
    ],
  },
  {
    key: 'project',
    title: 'Project',
    fields: [
      {
        key: 'project_id',
        name: 'project_id',
        type: 'model',
        module: projectModule,
        withCreate: true,
        select: '*',
        render: (props) => (
          <ModelFieldWithCrud
            {...props}
            module={projectModule}
            addFormSections={projectAddFormSections}
          />
        ),
      },
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
      },
      {
        key: 'billing_address_line_2',
        name: 'billing_address_line_2',
        type: 'input',
        fieldEffect: getBillingAddressFieldEffectByAddressKey({
          addressKey: 'line_2',
        }),
      },
      {
        key: 'billing_address_postal_code',
        name: 'billing_address_postal_code',
        type: 'input',
        fieldEffect: getBillingAddressFieldEffectByAddressKey({
          addressKey: 'postal_code',
        }),
      },
      {
        key: 'billing_address_city',
        name: 'billing_address_city',
        type: 'input',
        fieldEffect: getBillingAddressFieldEffectByAddressKey({
          addressKey: 'city',
        }),
      },
      {
        key: 'billing_address_country',
        name: 'billing_address_country',
        type: 'input',
        fieldEffect: getBillingAddressFieldEffectByAddressKey({
          addressKey: 'country',
        }),
      },
    ],
  },
  {
    key: 'order',
    title: 'Invoice',
    fields: [
      {
        key: 'invoice_id',
        name: 'invoice_id',
        label: 'Invoice Reference',
        type: 'model',
        module: invoiceModule,
      },
    ],
  },
  {
    key: 'lines',
    title: 'Lines',
    fields: [<CreditNoteLinesFieldArray />],
  },
  {
    key: 'total',
    title: 'Total',
    fields: [<TotalDisplayField />],
  },
  {
    key: 'notes',
    title: 'Total',
    fields: [
      { key: 'external_notes', name: 'external_notes', type: 'textarea' },
      { key: 'internal_notes', name: 'internal_notes', type: 'textarea' },
    ],
  },
  {
    key: 'pricing',
    title: 'Pricing',
    fields: [<CreditNoteTotalField />],
  },
]

export const creditNoteModule = {
  sk: 'slug',
  table: {
    name: 'credit_note',
  },
  name: {
    singular: 'Credit Note',
    plural: 'Credit Notes',
  },
  route: {
    plural: routes.CREDIT_NOTES,
  },
  select: {
    list: '*, project(id, title, slug), company(id, title, slug), invoice(id, title, slug), assignee:assignee_id(*)',
    detail:
      '*, project(*), company(*), contact(*), invoice(*), assignee:assignee_id(*), lines:credit_note_line(*, product(*))',
  },
  relations: {
    lines: { table: { name: 'credit_note_line' } },
  },
  Icon: CalculateOutlinedIcon,
}

export const creditNotePreviewFormSections = creditNoteFormSections

export const creditNoteColumnDefs = [
  { field: 'title', headerName: 'C/N No.' },
  {
    field: 'invoice.title',
    headerName: 'INV Ref',
    cellRenderer: ({ data }) => (
      <ModuleLink module={invoiceModule} item={data.invoice} />
    ),
  },
  { field: 'project.title', headerName: 'Project Name' },
  { field: 'company.title', headerName: 'Company' },
  {
    field: 'created_by',
    cellRenderer: ({ data }) => <UserCell id={data?.created_by} />,
  },
  {
    field: 'total',
    headerName: 'Amount',
    valueFormatter: ({ value }) => printAmount(value),
  },
  {
    field: 'created_at',
    valueFormatter: ({ value }) => value && dayjs(value).format('DD MMM YYYY'),
  },
]
