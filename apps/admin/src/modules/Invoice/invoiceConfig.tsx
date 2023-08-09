import React from 'react'
import { printAmount } from '@gravis-os/utils'
import { ModelFieldWithCrud } from '@gravis-os/crud'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import dayjs from 'dayjs'
import map from 'lodash/map'
import { Stack, Typography } from '@mui/material'
import StatusCell from '@admin/components/StatusCell'
import SubtotalField from '@admin/components/SubtotalField'
import ShippingField from '@admin/components/ShippingField'
import TaxField from '@admin/components/TaxField'
import { INVOICE_STATUS_CONFIG, INVOICE_TYPE_OPTIONS } from './constants'
import { getColorFromStatusConfig } from '../../utils/getColorFromStatusConfig'
import { projectAddFormSections, projectModule } from '../Project/projectConfig'
import { companyAddFormSections, companyModule } from '../Company/companyConfig'
import { contactAddFormSections, contactModule } from '../Contact'
import { TitleDisplayField } from '../Quotation/components'
import getBillingAddressFieldEffectByAddressKey from './utils/getBillingAddressFieldEffectByAddressKey'
import { salesOrderModule } from '../SalesOrder/salesOrderConfig'
import { invoiceAttachmentFileModule } from './invoiceAttachmentFileConfig'
import UserCell from '../../components/UserCell'
import AgingCounter from '../../components/AgingCounter'
import InvoiceLinesFieldArray from './components/InvoiceLinesFieldArray'
import { createGeneralFilterFormSection } from '../../utils/configHelpers'
import { getAssigneeField } from '../../utils/getUserField'
import TotalDisplayField from '../../components/TotalDisplayField'
import InvoiceCreditNoteField from './components/InvoiceCreditNoteField'
import InvoiceTotalField from './components/InvoiceTotalField'

export const invoiceFields = {
  assignee_id: getAssigneeField(),
  status: {
    key: 'status',
    name: 'status',
    type: 'input',
    options: map(INVOICE_STATUS_CONFIG, 'value'),
  },
  title: <TitleDisplayField overline="Invoice" />,
  type: {
    key: 'type',
    name: 'type',
    label: 'Type',
    type: 'input',
    options: INVOICE_TYPE_OPTIONS,
    disabled: true,
  },
  invoice_at: {
    key: 'invoice_at',
    name: 'invoice_at',
    label: 'Invoice Date',
    type: 'date',
  },
  project_id: {
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
  company_id: {
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
  contact_id: {
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

  billing_address_line_1: {
    key: 'billing_address_line_1',
    name: 'billing_address_line_1',
    type: 'input',
    fieldEffect: getBillingAddressFieldEffectByAddressKey({
      addressKey: 'line_1',
    }),
  },
  billing_address_line_2: {
    key: 'billing_address_line_2',
    name: 'billing_address_line_2',
    type: 'input',
    fieldEffect: getBillingAddressFieldEffectByAddressKey({
      addressKey: 'line_2',
    }),
  },
  billing_address_postal_code: {
    key: 'billing_address_postal_code',
    name: 'billing_address_postal_code',
    type: 'input',
    fieldEffect: getBillingAddressFieldEffectByAddressKey({
      addressKey: 'postal_code',
    }),
  },
  billing_address_city: {
    key: 'billing_address_city',
    name: 'billing_address_city',
    type: 'input',
    fieldEffect: getBillingAddressFieldEffectByAddressKey({
      addressKey: 'city',
    }),
  },
  billing_address_country: {
    key: 'billing_address_country',
    name: 'billing_address_country',
    type: 'input',
    fieldEffect: getBillingAddressFieldEffectByAddressKey({
      addressKey: 'country',
    }),
  },
  sales_order_id: {
    key: 'sales_order_id',
    name: 'sales_order_id',
    label: 'SO Reference',
    type: 'model',
    module: salesOrderModule,
  },
  payment_terms: {
    key: 'payment_terms',
    name: 'payment_terms',
    type: 'input',
  },
  terms: {
    key: 'terms',
    name: 'terms',
    type: 'input',
    options: [
      { key: 'COD', value: 'COD', label: 'COD' },
      { key: 'CASH_AND_CARRY', value: 'CASH_AND_CARRY', label: 'Cash & Carry' },
      { key: 'NET_30', value: 'NET_30', label: 'Net 30' },
      { key: 'NET_60', value: 'NET_60', label: 'Net 60' },
      { key: 'NET_90', value: 'NET_90', label: 'Net 90' },
    ],
  },
  due_at: {
    key: 'due_at',
    name: 'due_at',
    label: 'Due Date',
    type: 'date',
    fullWidth: true,
  },
  invoice_lines: <InvoiceLinesFieldArray />,
  total_display: <TotalDisplayField />,

  external_notes: {
    key: 'external_notes',
    name: 'external_notes',
    type: 'textarea',
  },
  internal_notes: {
    key: 'internal_notes',
    name: 'internal_notes',
    type: 'textarea',
  },

  subtotal: <SubtotalField />,
  credit_note: <InvoiceCreditNoteField />,
  shipping: <ShippingField />,
  tax: <TaxField />,
  total: <InvoiceTotalField />,

  attachment_files: {
    key: 'attachment_files',
    name: 'attachment_files',
    label: 'Invoice Attachments',
    type: 'files',
    module: invoiceAttachmentFileModule,
  },
}

export const invoiceFormSections = [
  {
    key: 'assignee',
    title: 'Assignee',
    fields: [invoiceFields.assignee_id],
  },
  {
    key: 'status',
    title: 'Status',
    fields: [invoiceFields.status],
  },
  {
    key: 'title',
    title: 'Invoice',
    fields: [invoiceFields.title],
  },
  {
    key: 'type',
    title: 'Type',
    fields: [invoiceFields.type],
  },
  {
    key: 'published_at',
    title: 'Invoice Date',
    fields: [invoiceFields.invoice_at],
    renderReadOnly: ({ value }) => (
      <Stack spacing={1}>
        <Typography variant="overline" color="text.secondary">
          Invoice Date
        </Typography>
        <Typography variant="h3">
          {value ? dayjs(value).format('DD MMM YYYY') : '-'}
        </Typography>
      </Stack>
    ),
  },
  {
    key: 'project',
    title: 'Project',
    fields: [invoiceFields.project_id],
  },
  {
    key: 'company',
    title: 'Company',
    fields: [invoiceFields.company_id],
  },
  {
    key: 'contact',
    title: 'Contact',
    fields: [invoiceFields.contact_id],
  },
  {
    key: 'billing_address',
    title: 'Billing Address',
    subtitle: 'Enter the billing address',
    icon: <BallotOutlinedIcon />,
    fields: [
      invoiceFields.billing_address_line_1,
      invoiceFields.billing_address_line_2,
      invoiceFields.billing_address_postal_code,
      invoiceFields.billing_address_city,
      invoiceFields.billing_address_country,
    ],
  },
  {
    key: 'order',
    title: 'Sales Order',
    fields: [invoiceFields.sales_order_id],
  },
  {
    key: 'payment',
    title: 'Payment',
    fields: [
      invoiceFields.payment_terms,
      invoiceFields.terms,
      invoiceFields.due_at,
    ],
  },
  {
    key: 'lines',
    title: 'Lines',
    fields: [invoiceFields.invoice_lines],
  },
  {
    key: 'total',
    title: 'Total',
    fields: [invoiceFields.total_display],
  },
  {
    key: 'notes',
    title: 'Notes',
    fields: [invoiceFields.external_notes, invoiceFields.internal_notes],
  },
  {
    key: 'pricing',
    title: 'Pricing',
    fields: [
      invoiceFields.subtotal,
      invoiceFields.credit_note,
      invoiceFields.shipping,
      invoiceFields.tax,
      invoiceFields.total,
    ],
    gridProps: { sx: { mb: 0 } },
  },
  {
    key: 'attachments',
    title: 'Attachment Dimensions',
    fields: [invoiceFields.attachment_files],
  },
]

export const invoiceFilterFormSections = [
  createGeneralFilterFormSection([
    invoiceFields.sales_order_id,
    invoiceFields.company_id,
    [
      {
        key: 'min_total',
        name: 'min_total',
        label: 'Min Amount Due',
        type: 'amount',
        filterKey: 'total',
        op: 'gte',
      },
      {
        key: 'max_total',
        name: 'max_total',
        label: 'Max Amount Due',
        type: 'amount',
        filterKey: 'total',
        op: 'lte',
      },
    ],
    invoiceFields.status,
  ]),
]

export const invoicePreviewFormSections = invoiceFormSections
export const invoiceAddFormSections = invoiceFormSections

export const invoiceColumnDefs = [
  { field: 'title', headerName: 'INV ID' },
  { field: 'sales_order.title', headerName: 'SO Ref' },
  { field: 'company.title', headerName: 'Company' },
  {
    field: 'total',
    headerName: 'Amount Due',
    valueFormatter: ({ value }) => printAmount(value),
  },
  {
    field: 'assignee.email',
    headerName: 'Assignee',
  },
  {
    field: 'due_at',
    headerName: 'Due Date',
    valueFormatter: ({ value }) => value && dayjs(value).format('DD MMM YYYY'),
  },
  {
    field: 'created_at',
    headerName: 'Aging',
    cellRenderer: AgingCounter,
    maxWidth: 100,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    valueFormatter: ({ value }) => value && dayjs(value).format('DD MMM YYYY'),
  },
  {
    field: 'created_by',
    headerName: 'Created By',
    cellRenderer: ({ data }) => <UserCell id={data?.created_by} />,
  },
  {
    field: 'status',
    pinned: 'right',
    maxWidth: 150,
    cellRenderer: ({ value }) => (
      <StatusCell
        color={getColorFromStatusConfig(INVOICE_STATUS_CONFIG)(value)}
        label={value}
      />
    ),
  },
]
