import React from 'react'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import { printNumber } from '@gravis-os/utils'
import { routes } from '@admin/app/routes'
import { ModelFieldWithCrud } from '@gravis-os/crud'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import { get } from 'lodash'
import dayjs from 'dayjs'
import StatusCell from '@admin/components/StatusCell'
import SubtotalField from '@admin/components/SubtotalField'
import TaxField from '@admin/components/TaxField'
import { getColorFromStatusConfig } from '@admin/utils/getColorFromStatusConfig'
import { PURCHASE_ORDER_STATUS_CONFIG } from '@admin/modules/PurchaseOrder/constants'
import { getAssigneeField } from '@admin/utils/getUserField'
import { projectAddFormSections, projectModule } from '../Project/projectConfig'
import {
  companyAddFormSections,
  companyModule,
  companyPreviewFormSections,
} from '../Company/companyConfig'
import { contactAddFormSections, contactModule } from '../Contact'
import {
  PublishedAtDisplayField,
  TitleDisplayField,
  TotalDisplayField,
} from '../Quotation/components'
import {
  getBillingAddressFieldEffectByAddressKey,
  getIsBillingAddressFieldDisabled,
  getShippingAddressFieldEffectByAddressKey,
} from '../Quotation/utils'
import { debitNoteAttachmentFileModule } from './debitNoteAttachmentFileConfig'
import { supplierInvoiceModule } from '../SupplierInvoice/supplierInvoiceConfig'
import DebitNoteLinesFieldArray from './components/DebitNoteLinesFieldArray'
import UserCell from '../../components/UserCell'
import SupplierInvoiceTotalField from '../SupplierInvoice/components/SupplierInvoiceTotalField'

export const debitNoteFormSections = [
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
    title: 'Debit Note',
    fields: [<TitleDisplayField overline="Debit Note" />],
  },
  {
    key: 'published_at',
    title: 'Debit Note Date',
    fields: [<PublishedAtDisplayField overline="Debit Note Date" />],
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
        filters: [{ pk: 'type', value: 'Supplier' }],
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
    key: 'order',
    title: 'Supplier Invoice Reference',
    fields: [
      {
        key: 'supplier_invoice_id',
        name: 'supplier_invoice_id',
        label: 'Supplier Invoice Reference',
        type: 'model',
        module: supplierInvoiceModule,
      },
    ],
  },
  {
    key: 'lines',
    title: 'Lines',
    fields: [<DebitNoteLinesFieldArray />],
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
    fields: [<SubtotalField />, <TaxField />, <SupplierInvoiceTotalField />],
    gridProps: { sx: { mb: 0 } },
  },
  {
    key: 'attachments',
    title: 'Attachment Dimensions',
    fields: [
      {
        key: 'attachment_files',
        name: 'attachment_files',
        label: 'Debit Note Attachments',
        type: 'files',
        module: debitNoteAttachmentFileModule,
      },
    ],
  },
]

export const debitNoteModule = {
  sk: 'slug',
  table: {
    name: 'debit_note',
  },
  name: {
    singular: 'Debit Note',
    plural: 'Debit Notes',
  },
  relations: {
    lines: { table: { name: 'debit_note_line' } },
  },
  route: {
    plural: routes.DEBIT_NOTES,
  },
  select: {
    list: '*, project(id, title, slug), company(id, title, slug), contact(id, title, slug), assignee:assignee_id(*)',
    detail:
      '*, project(*), company(*), contact(*), supplier_invoice:supplier_invoice_id(*), lines:debit_note_line(*, product(*, brand(*, currency_factor(title, buy_rate, sell_rate), company:company_id(title, slug)), category(title)))',
  },
  Icon: CalculateOutlinedIcon,
}

export const debitNotePreviewFormSections = debitNoteFormSections

export const debitNoteColumnDefs = [
  { field: 'title' },
  {
    field: 'company.title',
    headerName: 'Supplier',
    module: companyModule,
    previewFormSections: companyPreviewFormSections,
  },
  {
    field: 'users',
    headerName: 'Assignee',
    cellRenderer: ({ value }) => <UserCell id={get(value, '[0].user_id')} />,
  },
  { field: 'total', valueFormatter: ({ value }) => printNumber(value) },
  {
    field: 'created_at',
    valueFormatter: ({ value }) => value && dayjs(value).format('DD MMM YYYY'),
  },
  {
    field: 'status',
    maxWidth: 150,
    cellRenderer: ({ value }) => (
      <StatusCell
        color={getColorFromStatusConfig(PURCHASE_ORDER_STATUS_CONFIG)(value)}
        label={value}
      />
    ),
  },
]
