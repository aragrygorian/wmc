import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import { printAmount } from '@gravis-os/utils'
import { routes } from '@admin/app/routes'
import { ModelFieldWithCrud } from '@gravis-os/crud'
import dayjs from 'dayjs'
import StatusCell from '@admin/components/StatusCell'
import map from 'lodash/map'
import SubtotalField from '@admin/components/SubtotalField'
import TaxField from '@admin/components/TaxField'
import { companyAddFormSections, companyModule } from '../Company/companyConfig'
import { contactAddFormSections, contactModule } from '../Contact'
import { TitleDisplayField } from '../Quotation/components'
import { supplierInvoiceAttachmentFileModule } from './supplierAttachmentFileConfig'
import SupplierInvoiceLinesFieldArray from './components/SupplierInvoiceLinesFieldArray'
import TotalDisplayField from './components/TotalDisplayField'
import CreatedAtDisplayField from './components/CreatedAtDisplayField'
import UserCell from '../../components/UserCell'
import getBillingAddressFieldEffectByAddressKey from './utils/getBillingAddressFieldEffectByAddressKey'
import { SUPPLIER_INVOICE_STATUS_CONFIG } from './constants'
import {
  createGeneralFilterFormSection,
  createMinMaxAmountFilterField,
} from '../../utils/configHelpers'
import { getAssigneeField } from '../../utils/getUserField'
import SupplierInvoiceTotalField from './components/SupplierInvoiceTotalField'
import { getColorFromStatusConfig } from '../../utils/getColorFromStatusConfig'

export const supplierInvoiceFields = {
  assignee_id: getAssigneeField(),
  status: {
    key: 'status',
    name: 'status',
    type: 'input',
    options: map(SUPPLIER_INVOICE_STATUS_CONFIG, 'value'),
  },
  title: <TitleDisplayField overline="Supplier Invoice" />,
  published_at: <CreatedAtDisplayField overline="Supplier Invoice Date" />,
  company_id: {
    key: 'company_id',
    name: 'company_id',
    type: 'model',
    module: companyModule,
    withCreate: true,
    select: '*',
    label: 'Supplier',
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
    label: 'Contact',
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
  supplier_invoice_lines: <SupplierInvoiceLinesFieldArray />,
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
  tax: <TaxField />,
  total: <SupplierInvoiceTotalField />,

  attachment_files: {
    key: 'attachment_files',
    name: 'attachment_files',
    label: 'Supplier Invoice Attachments',
    type: 'files',
    module: supplierInvoiceAttachmentFileModule,
  },
}

export const supplierInvoiceFormSections = [
  {
    key: 'assignee',
    title: 'Assignee',
    fields: [supplierInvoiceFields.assignee_id],
  },
  {
    key: 'status',
    title: 'Status',
    fields: [supplierInvoiceFields.status],
  },
  {
    key: 'title',
    title: 'Supplier Invoice',
    fields: [supplierInvoiceFields.title],
  },
  {
    key: 'published_at',
    title: 'Created At',
    fields: [supplierInvoiceFields.published_at],
  },
  {
    key: 'company',
    title: 'Company',
    fields: [supplierInvoiceFields.company_id],
  },
  {
    key: 'contact',
    title: 'Contact',
    fields: [supplierInvoiceFields.contact_id],
  },
  {
    key: 'billing_address',
    title: 'Billing Address',
    subtitle: 'Enter the billing address',
    icon: <BallotOutlinedIcon />,
    fields: [
      supplierInvoiceFields.billing_address_line_1,
      supplierInvoiceFields.billing_address_line_2,
      supplierInvoiceFields.billing_address_postal_code,
      supplierInvoiceFields.billing_address_city,
      supplierInvoiceFields.billing_address_country,
    ],
  },
  {
    key: 'lines',
    title: 'Lines',
    fields: [supplierInvoiceFields.supplier_invoice_lines],
  },
  {
    key: 'total',
    title: 'Total',
    fields: [supplierInvoiceFields.total_display],
  },
  {
    key: 'notes',
    title: 'Total',
    fields: [
      supplierInvoiceFields.external_notes,
      supplierInvoiceFields.internal_notes,
    ],
  },
  {
    key: 'pricing',
    title: 'Pricing',
    fields: [
      supplierInvoiceFields.subtotal,
      supplierInvoiceFields.tax,
      supplierInvoiceFields.total,
    ],
    gridProps: { sx: { mb: 0 } },
  },
  {
    key: 'attachments',
    title: 'Attachment Dimensions',
    fields: [supplierInvoiceFields.attachment_files],
  },
]

export const supplierInvoiceFilterFormSections = [
  createGeneralFilterFormSection([
    supplierInvoiceFields.company_id,
    createMinMaxAmountFilterField('total'),
    supplierInvoiceFields.status,
  ]),
]

export const supplierInvoiceModule = {
  sk: 'slug',
  table: {
    name: 'supplier_invoice',
  },
  name: {
    singular: 'Supplier Invoice',
    plural: 'Supplier Invoices',
  },
  route: {
    plural: routes.SUPPLIER_INVOICES,
  },
  select: {
    list: '*, assignee:assignee_id(*), company:company_id(id, title, slug)',
    detail: `*,
      project:project_id(*),
      company:company_id(*),
      contact:contact_id(*),
      assignee:assignee_id(*),
      payments:supplier_invoice_payment(*),
      lines:supplier_invoice_line(*,
        product(*),
        purchase_order_line(*,
          purchase_order(*),
          order_form_line:order_form_line_id(*,
            order_form(*,
              sales_order(*)
            )
          )
        )
      )`,
  },
  relations: {
    lines: { table: { name: 'supplier_invoice_line' } },
  },
  Icon: CalculateOutlinedIcon,
}

export const supplierInvoicePreviewFormSections = supplierInvoiceFormSections
export const supplierInvoiceAddFormSections = supplierInvoiceFormSections

export const supplierInvoiceColumnDefs = [
  { field: 'title', headerName: 'SIN ID', minWidth: 140, maxWidth: 140 },
  { field: 'company.title', headerName: 'Supplier' },
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
    field: 'created_at',
    headerName: 'Created At',
    valueFormatter: ({ data }) => dayjs(data?.created_at).format('DD MMM YYYY'),
  },
  {
    field: 'created_by',
    headerName: 'Created By',
    cellRenderer: ({ data }) => <UserCell id={data?.created_by} />,
  },
  {
    field: 'status',
    pinned: 'right',
    minWidth: 100,
    maxWidth: 100,
    cellRenderer: ({ value }) => (
      <StatusCell
        color={getColorFromStatusConfig(SUPPLIER_INVOICE_STATUS_CONFIG)(value)}
        label={value}
      />
    ),
  },
]
