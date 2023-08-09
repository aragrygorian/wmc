import React from 'react'
import { ModelFieldWithCrud } from '@gravis-os/crud'
import { printNumber } from '@gravis-os/utils'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined'
import { routes } from '@admin/app/routes'
import { getAssigneeField } from '@admin/utils/getUserField'
import StatusCell from '@admin/components/StatusCell'
import map from 'lodash/map'
import ShippingField from '@admin/components/ShippingField'
import TotalField from '@admin/components/TotalField'
import QuotationSubtotalField from '@admin/modules/Quotation/components/QuotationSubtotalField'
import TaxField from '@admin/components/TaxField'
import AdditionalDiscountField from '@admin/components/AdditionalDiscountField'
import SalesOrderLinesFieldArray from '@admin/modules/SalesOrder/components/SalesOrderLinesFieldArray'
import { quotationModule } from '@admin/modules/Quotation/quotationModule'
import { SALES_ORDER_STATUS_CONFIG } from './constants'
import { getColorFromStatusConfig } from '../../utils/getColorFromStatusConfig'
import {
  createGeneralFilterFormSection,
  createMinMaxAmountFilterField,
} from '../../utils/configHelpers'
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
  projectAddFormSections,
  projectModule,
  projectPreviewFormSections,
} from '../Project/projectConfig'
import {
  PublishedAtDisplayField,
  TotalDisplayField,
} from '../Quotation/components'
import {
  getBillingAddressFieldEffectByAddressKey,
  getIsBillingAddressFieldDisabled,
  getShippingAddressFieldEffectByAddressKey,
} from '../Quotation/utils'
import { salesOrderAttachmentFileModule } from './salesOrderAttachmentFileConfig'

export const salesOrderFields = {
  assignee_id: getAssigneeField(),
  status: {
    key: 'status',
    name: 'status',
    type: 'input',
    options: map(SALES_ORDER_STATUS_CONFIG, 'value'),
  },
  title: {
    key: 'title',
    name: 'title',
    label: 'Sales Order',
    type: 'input',
    required: true,
    disabled: true,
  },
  published_at: <PublishedAtDisplayField overline="Sales Order Date" />,
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

  shipping_address_line_1: {
    key: 'shipping_address_line_1',
    name: 'shipping_address_line_1',
    type: 'input',
    fieldEffect: getShippingAddressFieldEffectByAddressKey({
      addressKey: 'line_1',
    }),
  },
  shipping_address_line_2: {
    key: 'shipping_address_line_2',
    name: 'shipping_address_line_2',
    type: 'input',
    fieldEffect: getShippingAddressFieldEffectByAddressKey({
      addressKey: 'line_2',
    }),
  },
  shipping_address_postal_code: {
    key: 'shipping_address_postal_code',
    name: 'shipping_address_postal_code',
    type: 'input',
    fieldEffect: getShippingAddressFieldEffectByAddressKey({
      addressKey: 'postal_code',
    }),
  },
  shipping_address_city: {
    key: 'shipping_address_city',
    name: 'shipping_address_city',
    type: 'input',
    fieldEffect: getShippingAddressFieldEffectByAddressKey({
      addressKey: 'city',
    }),
  },
  shipping_address_country: {
    key: 'shipping_address_country',
    name: 'shipping_address_country',
    type: 'input',
    fieldEffect: getShippingAddressFieldEffectByAddressKey({
      addressKey: 'country',
    }),
  },
  is_billing_address_same_as_shipping_address: {
    key: 'is_billing_address_same_as_shipping_address',
    name: 'is_billing_address_same_as_shipping_address',
    type: 'switch',
  },

  billing_address_line_1: {
    key: 'billing_address_line_1',
    name: 'billing_address_line_1',
    type: 'input',
    fieldEffect: getBillingAddressFieldEffectByAddressKey({
      addressKey: 'line_1',
    }),
    disabled: getIsBillingAddressFieldDisabled,
  },
  billing_address_line_2: {
    key: 'billing_address_line_2',
    name: 'billing_address_line_2',
    type: 'input',
    fieldEffect: getBillingAddressFieldEffectByAddressKey({
      addressKey: 'line_2',
    }),
    disabled: getIsBillingAddressFieldDisabled,
  },
  billing_address_postal_code: {
    key: 'billing_address_postal_code',
    name: 'billing_address_postal_code',
    type: 'input',
    fieldEffect: getBillingAddressFieldEffectByAddressKey({
      addressKey: 'postal_code',
    }),
    disabled: getIsBillingAddressFieldDisabled,
  },
  billing_address_city: {
    key: 'billing_address_city',
    name: 'billing_address_city',
    type: 'input',
    fieldEffect: getBillingAddressFieldEffectByAddressKey({
      addressKey: 'city',
    }),
    disabled: getIsBillingAddressFieldDisabled,
  },
  billing_address_country: {
    key: 'billing_address_country',
    name: 'billing_address_country',
    type: 'input',
    fieldEffect: getBillingAddressFieldEffectByAddressKey({
      addressKey: 'country',
    }),
    disabled: getIsBillingAddressFieldDisabled,
  },
  order_id: {
    key: 'quotation_id',
    name: 'quotation_id',
    label: 'QT Reference',
    type: 'model',
    module: quotationModule,
  },
  payment_terms: {
    key: 'payment_terms',
    name: 'payment_terms',
    type: 'input',
    options: [
      { key: 'COD', value: 'COD', label: 'COD' },
      { key: 'CASH_AND_CARRY', value: 'CASH_AND_CARRY', label: 'Cash & Carry' },
      { key: 'NET_30', value: 'NET_30', label: 'Net 30' },
      { key: 'NET_60', value: 'NET_60', label: 'Net 60' },
      { key: 'NET_90', value: 'NET_90', label: 'Net 90' },
    ],
  },
  quotation_lines: <SalesOrderLinesFieldArray />,
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

  subtotal: <QuotationSubtotalField />,
  discount_rate: <AdditionalDiscountField />,
  shipping: <ShippingField />,
  tax: <TaxField />,
  total: <TotalField />,

  attachment_files: {
    key: 'attachment_files',
    name: 'attachment_files',
    label: 'Sales Order Attachments',
    type: 'files',
    module: salesOrderAttachmentFileModule,
  },
}

export const salesOrderFormSections = [
  {
    key: 'assignee',
    title: 'Assignee',
    fields: [salesOrderFields.assignee_id],
  },
  {
    key: 'status',
    title: 'Status',
    fields: [salesOrderFields.status],
  },
  {
    key: 'title',
    title: 'Sales Order',
    fields: [salesOrderFields.title],
  },
  {
    key: 'published_at',
    title: 'Sales Order Date',
    fields: [salesOrderFields.published_at],
  },
  {
    key: 'project',
    title: 'Project',
    fields: [salesOrderFields.project_id],
  },
  {
    key: 'company',
    title: 'Company',
    fields: [salesOrderFields.company_id],
  },
  {
    key: 'contact',
    title: 'Contact',
    fields: [salesOrderFields.contact_id],
  },
  {
    key: 'shipping_address',
    title: 'Shipping Address',
    subtitle: 'Enter the shipping address',
    icon: <BallotOutlinedIcon />,
    fields: [
      salesOrderFields.shipping_address_line_1,
      salesOrderFields.shipping_address_line_2,
      salesOrderFields.shipping_address_postal_code,
      salesOrderFields.shipping_address_city,
      salesOrderFields.shipping_address_country,
      salesOrderFields.is_billing_address_same_as_shipping_address,
    ],
  },
  {
    key: 'billing_address',
    title: 'Billing Address',
    subtitle: 'Enter the billing address',
    icon: <BallotOutlinedIcon />,
    fields: [
      salesOrderFields.billing_address_line_1,
      salesOrderFields.billing_address_line_2,
      salesOrderFields.billing_address_postal_code,
      salesOrderFields.billing_address_city,
      salesOrderFields.billing_address_country,
    ],
  },
  {
    key: 'order',
    title: 'Order',
    fields: [salesOrderFields.order_id],
  },
  {
    key: 'payment',
    title: 'Payment',
    fields: [salesOrderFields.payment_terms],
  },
  {
    key: 'lines',
    title: 'Lines',
    fields: [salesOrderFields.quotation_lines],
  },
  {
    key: 'total',
    title: 'Total',
    fields: [salesOrderFields.total_display],
  },
  {
    key: 'notes',
    title: 'Notes',
    fields: [salesOrderFields.external_notes, salesOrderFields.internal_notes],
  },
  {
    key: 'pricing',
    title: 'Pricing',
    fields: [
      salesOrderFields.subtotal,
      salesOrderFields.discount_rate,
      salesOrderFields.shipping,
      salesOrderFields.tax,
      salesOrderFields.total,
    ],
    gridProps: { sx: { mb: 0 } },
  },
  {
    key: 'attachments',
    title: 'Attachment Dimensions',
    fields: [salesOrderFields.attachment_files],
  },
]

export const salesOrderModule = {
  sk: 'slug',
  table: {
    name: 'sales_order',
  },
  name: {
    singular: 'Sales Order',
    plural: 'Sales Orders',
  },
  relations: {
    lines: { table: { name: 'sales_order_line' } },
  },
  route: {
    plural: routes.SALES_ORDERS,
  },
  select: {
    list: '*, assignee:assignee_id(*), project!project_id(id, title, slug), company!company_id(id, title, slug), contact!contact_id(id, title, slug)',
    detail: `*,
      assignee:assignee_id(*),
      project!project_id(*),
      company!company_id(*),
      contact!contact_id(*),
      lines:sales_order_line(*,
        product:product_id(*,
          brand(*,
            currency_factor(title, buy_rate, sell_rate),
            company:company_id(title, slug)
          ),
          category(title)
        )
      ),
      delivery_order(*,
        lines:delivery_order_line(*)
      )`,
  },
  Icon: LocalActivityOutlinedIcon,
}

export const salesOrderPreviewFormSections = salesOrderFormSections

export const salesOrderFilterFormSections = [
  createGeneralFilterFormSection([
    salesOrderFields.project_id,
    salesOrderFields.company_id,
    salesOrderFields.contact_id,
    salesOrderFields.status,
    createMinMaxAmountFilterField('total'),
  ]),
]

export const salesOrderColumnDefs = [
  { field: 'title' },
  {
    field: 'project.title',
    module: projectModule,
    previewFormSections: projectPreviewFormSections,
  },
  {
    field: 'company.title',
    module: companyModule,
    previewFormSections: companyPreviewFormSections,
  },
  {
    field: 'contact.title',
    module: contactModule,
    previewFormSections: contactPreviewFormSections,
  },
  { field: 'total', valueFormatter: ({ value }) => printNumber(value) },
  {
    field: 'status',
    maxWidth: 150,
    cellRenderer: ({ value }) => (
      <StatusCell
        color={getColorFromStatusConfig(SALES_ORDER_STATUS_CONFIG)(value)}
        label={value}
      />
    ),
  },
]
