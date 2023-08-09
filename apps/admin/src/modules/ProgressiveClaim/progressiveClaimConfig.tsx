import React from 'react'
import { commonConfig } from '@common/config'
import { ModelFieldWithCrud } from '@gravis-os/crud'
import { printAmount } from '@gravis-os/utils'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import { Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import StatusCell from '@admin/components/StatusCell'
import ModuleLink from '../../components/ModuleLink'
import UserCell from '../../components/UserCell'
import { getAssigneeField } from '../../utils/getUserField'
import {
  createGeneralFilterFormSection,
  createMinMaxAmountFilterField,
} from '../../utils/configHelpers'
import { companyAddFormSections, companyModule } from '../Company/companyConfig'
import { contactAddFormSections, contactModule } from '../Contact'
import { projectAddFormSections, projectModule } from '../Project/projectConfig'
import { TitleDisplayField } from '../Quotation/components'
import { salesOrderModule } from '../SalesOrder/salesOrderConfig'
import ProgressiveClaimLinesFieldArray from './components/ProgressiveClaimLinesFieldArray'
import ProgressiveClaimCustomPricingField from './components/ProgressiveClaimCustomPricingField'
import ProgressiveClaimStats from './components/ProgressiveClaimStats'
import { progressiveClaimAttachmentFileModule } from './progressiveClaimAttachmentFileConfig'
import getBillingAddressFieldEffectByAddressKey from './utils/getBillingAddressFieldEffectByAddressKey'
import getProgressiveClaimStatusColor from './utils/getProgressiveClaimStatusColor'
import renderReadOnlyProgressiveClaimPricing from './utils/renderReadOnlyProgressiveClaimPricing'

export const progressiveClaimFields = {
  assignee_id: getAssigneeField(),
  status: {
    key: 'status',
    name: 'status',
    type: 'input',
    options: ['New', 'Paid'],
  },
  title: <TitleDisplayField overline="Progressive Claim" />,
  claim_at: {
    key: 'claim_at',
    name: 'claim_at',
    label: 'Progressive Claim Date',
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
  progressive_claim_lines: <ProgressiveClaimLinesFieldArray />,
  total_stats: <ProgressiveClaimStats />,
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
  retention: (
    <ProgressiveClaimCustomPricingField
      name="retention"
      label="Less Retention 10%"
      fullWidth
      disabled
    />
  ),
  balance_amount: (
    <ProgressiveClaimCustomPricingField
      name="balance_amount"
      label="Balance Amount"
      fullWidth
      disabled
    />
  ),
  previous_payment: (
    <ProgressiveClaimCustomPricingField
      name="previous_payment"
      label="Previous Payment"
      fullWidth
      disabled
    />
  ),
  contract_sum: (
    <ProgressiveClaimCustomPricingField
      name="contract_sum"
      label="Contract Sum"
      fullWidth
      disabled
    />
  ),
  tax_rate: {
    key: 'tax_rate',
    name: 'tax_rate',
    label: 'GST (%)',
    type: 'percentage',
    defaultValue: commonConfig.taxRate,
  },
  tax: {
    key: 'tax',
    name: 'tax',
    label: 'GST ($)',
    type: 'amount',
    disabled: true,
  },
  total: { key: 'total', name: 'total', type: 'amount', disabled: true },
  attachment_files: {
    key: 'attachment_files',
    name: 'attachment_files',
    label: 'Progressive Claim Attachments',
    type: 'files',
    module: progressiveClaimAttachmentFileModule,
  },
}

export const progressiveClaimFormSections = [
  {
    key: 'assignee',
    title: 'Assignee',
    fields: [progressiveClaimFields.assignee_id],
  },
  {
    key: 'status',
    title: 'Status',
    fields: [progressiveClaimFields.status],
  },
  {
    key: 'title',
    title: 'Progressive Claim',
    fields: [progressiveClaimFields.title],
  },
  {
    key: 'published_at',
    title: 'Progressive Claim Date',
    fields: [progressiveClaimFields.claim_at],
    renderReadOnly: ({ value }) => (
      <Stack spacing={1}>
        <Typography variant="overline" color="text.secondary">
          Progressive Claim Date
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
    fields: [progressiveClaimFields.project_id],
  },
  {
    key: 'company',
    title: 'Company',
    fields: [progressiveClaimFields.company_id],
  },
  {
    key: 'contact',
    title: 'Contact',
    fields: [progressiveClaimFields.contact_id],
  },
  {
    key: 'billing_address',
    title: 'Billing Address',
    subtitle: 'Enter the billing address',
    icon: <BallotOutlinedIcon />,
    fields: [
      progressiveClaimFields.billing_address_line_1,
      progressiveClaimFields.billing_address_line_2,
      progressiveClaimFields.billing_address_postal_code,
      progressiveClaimFields.billing_address_city,
      progressiveClaimFields.billing_address_country,
    ],
  },
  {
    key: 'order',
    title: 'Sales Order',
    fields: [progressiveClaimFields.sales_order_id],
  },
  {
    key: 'lines',
    title: 'Lines',
    fields: [progressiveClaimFields.progressive_claim_lines],
  },
  {
    key: 'total',
    title: 'Total',
    fields: [progressiveClaimFields.total_stats],
  },
  {
    key: 'notes',
    title: 'Notes',
    fields: [
      progressiveClaimFields.external_notes,
      progressiveClaimFields.internal_notes,
    ],
  },
  {
    key: 'pricing',
    title: 'Pricing',
    fields: [
      progressiveClaimFields.retention,
      progressiveClaimFields.balance_amount,
      progressiveClaimFields.previous_payment,
      progressiveClaimFields.contract_sum,
      progressiveClaimFields.tax_rate,
      progressiveClaimFields.tax,
      progressiveClaimFields.total,
    ],
    gridProps: { sx: { mb: 0 } },
    renderReadOnly: renderReadOnlyProgressiveClaimPricing,
  },
  {
    key: 'attachments',
    title: 'Attachment Dimensions',
    fields: [progressiveClaimFields.attachment_files],
  },
]

export const progressiveClaimFilterFormSections = [
  createGeneralFilterFormSection([
    progressiveClaimFields.sales_order_id,
    progressiveClaimFields.project_id,
    createMinMaxAmountFilterField(progressiveClaimFields.total.key),
    progressiveClaimFields.status,
  ]),
]

export const progressiveClaimPreviewFormSections = progressiveClaimFormSections

export const progressiveClaimColumnDefs = [
  { field: 'title', headerName: 'PC ID' },
  {
    field: 'sales_order.title',
    headerName: 'SO Ref',
    cellRenderer: ({ data }) => (
      <ModuleLink module={salesOrderModule} item={data.sales_order} />
    ),
  },
  { field: 'project.title', headerName: 'Project' },
  {
    field: 'total',
    headerName: 'Amount Due',
    valueFormatter: ({ value }) => printAmount(value),
  },
  { field: 'user.title', headerName: 'Assignee' },
  {
    field: 'created_at',
    valueFormatter: ({ value }) => value && dayjs(value).format('DD MMM YYYY'),
  },
  {
    field: 'created_by',
    cellRenderer: ({ data }) => <UserCell id={data?.created_by} />,
  },
  {
    field: 'status',
    cellRenderer: ({ value }) => (
      <StatusCell color={getProgressiveClaimStatusColor(value)} label={value} />
    ),
  },
]
