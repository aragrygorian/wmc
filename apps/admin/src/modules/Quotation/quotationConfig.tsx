import { routes } from '@admin/app/routes'
import AdditionalDiscountField from '@admin/components/AdditionalDiscountField'
import ShippingField from '@admin/components/ShippingField'
import StatusCell from '@admin/components/StatusCell'
import TaxField from '@admin/components/TaxField'
import TotalField from '@admin/components/TotalField'
import QuotationSubtotalField from '@admin/modules/Quotation/components/QuotationSubtotalField'
import { getAssigneeField } from '@admin/utils/getUserField'
import { ModelFieldWithCrud } from '@gravis-os/crud'
import { StorageAvatar } from '@gravis-os/storage'
import { Stack, Typography } from '@gravis-os/ui'
import { printNumber } from '@gravis-os/utils'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import dayjs from 'dayjs'
import { map } from 'lodash'
import React from 'react'
import { useWatch } from 'react-hook-form'
import * as yup from 'yup'
import { createGeneralFilterFormSection } from '../../utils/configHelpers'
import { getColorFromStatusConfig } from '../../utils/getColorFromStatusConfig'
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
import { currencyFactorModule } from '../CurrencyFactor/currencyFactorConfig'
import { orderModule } from '../Order/orderConfig'
import {
  projectAddFormSections,
  projectModule,
  projectPreviewFormSections,
} from '../Project/projectConfig'
import {
  PublishedAtDisplayField,
  QuotationLinesFieldArray,
  TitleDisplayField,
  TotalDisplayField,
} from './components'
import QuotationIronmongeryLinesFieldArray from './components/QuotationIronmongeryLinesFieldArray'
import { QUOTATION_STATUS_CONFIG } from './constants'
import { quotationAttachmentFileModule } from './quotationAttachmentFileConfig'
import {
  getBillingAddressFieldEffectByAddressKey,
  getIsBillingAddressFieldDisabled,
  getShippingAddressFieldEffectByAddressKey,
} from './utils'

export const quotationFields = {
  assignee_id: getAssigneeField(),
  status: {
    key: 'status',
    name: 'status',
    type: 'input',
    options: map(QUOTATION_STATUS_CONFIG, 'value'),
  },
  title: <TitleDisplayField overline="Quotation" />,
  published_at: <PublishedAtDisplayField overline="Quote Date" />,
  project_id: {
    key: 'project_id',
    name: 'project_id',
    type: 'model',
    module: projectModule,
    withCreate: true,
    select: '*, project_brand!project_id(*), project_product(*)',
    render: (props) => {
      const { formContext } = props
      const { watch } = formContext
      const defaultValues = watch('project')

      return (
        <ModelFieldWithCrud
          {...props}
          module={projectModule}
          addFormSections={projectAddFormSections}
          crudAddDialogProps={{ crudFormProps: { defaultValues } }}
        />
      )
    },
  },
  currency_type: {
    key: 'currency_factor_id',
    name: 'currency_factor_id',
    type: 'model',
    select: '*, project_currency_factor(*)',
    module: currencyFactorModule,
    label: 'Currency Type',
  },
  currency_rate: {
    key: 'currency_rate',
    name: 'currency_rate',
    type: 'rate',
    disabled: true,
    fieldEffect: {
      watch: ['currency_factor_id'],
      setValue: (props) => {
        const { values } = props
        const currencyFactor = values.currency_factor_id || {}
        return currencyFactor.sell_rate
      },
    },
  },
  company_id: {
    key: 'company_id',
    name: 'company_id',
    type: 'model',
    module: companyModule,
    withCreate: true,
    select: '*, company_brand(*)',
    render: (props) => {
      const { formContext } = props
      const { watch } = formContext
      const defaultValues = watch('company')

      return (
        <ModelFieldWithCrud
          {...props}
          module={companyModule}
          addFormSections={companyAddFormSections}
          crudAddDialogProps={{ crudFormProps: { defaultValues } }}
        />
      )
    },
  },
  contact_id: {
    key: 'contact_id',
    name: 'contact_id',
    type: 'model',
    module: contactModule,
    withCreate: true,
    select: '*',
    render: (props) => {
      const { formContext } = props
      const { control } = formContext
      const [defaultValues, company] = useWatch({
        control,
        name: ['contact', 'company'],
      })

      return (
        <ModelFieldWithCrud
          {...props}
          module={contactModule}
          addFormSections={contactAddFormSections}
          crudAddDialogProps={{ crudFormProps: { defaultValues } }}
          modelFieldProps={{
            filters: [
              {
                pk: 'company_id',
                op: 'eq',
                value: company?.id,
              },
            ],
          }}
        />
      )
    },
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
    key: 'order_id',
    name: 'order_id',
    label: 'SO Reference',
    type: 'model',
    module: orderModule,
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
  quotation_lines: <QuotationLinesFieldArray />,
  ironmongery_quotation_lines: <QuotationIronmongeryLinesFieldArray />,
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
    label: 'Quotation Attachments',
    type: 'files',
    module: quotationAttachmentFileModule,
  },
}

export const quotationFormSections = [
  {
    key: 'assignee',
    title: 'Assignee',
    fields: [quotationFields.assignee_id],
  },
  {
    key: 'status',
    title: 'Status',
    fields: [quotationFields.status],
    renderReadOnly: (props) => {
      const { value } = props
      return (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={0.5}
        >
          <Typography variant="subtitle1">Status:</Typography>
          <StatusCell
            color={getColorFromStatusConfig(QUOTATION_STATUS_CONFIG)(value)}
            label={value}
          />
        </Stack>
      )
    },
  },
  {
    key: 'title',
    title: 'Quotation',
    fields: [quotationFields.title],
  },
  {
    key: 'published_at',
    title: 'Quote Date',
    fields: [quotationFields.published_at],
  },
  {
    key: 'project',
    title: 'Project',
    fields: [
      quotationFields.project_id,
      [quotationFields.currency_type, quotationFields.currency_rate],
    ],
  },
  {
    key: 'company',
    title: 'Company',
    fields: [quotationFields.company_id],
  },
  {
    key: 'contact',
    title: 'Contact',
    fields: [quotationFields.contact_id],
  },
  {
    key: 'shipping_address',
    title: 'Shipping Address',
    subtitle: 'Enter the shipping address',
    icon: <BallotOutlinedIcon />,
    fields: [
      quotationFields.shipping_address_line_1,
      quotationFields.shipping_address_line_2,
      quotationFields.shipping_address_postal_code,
      quotationFields.shipping_address_city,
      quotationFields.shipping_address_country,
      quotationFields.is_billing_address_same_as_shipping_address,
    ],
  },
  {
    key: 'billing_address',
    title: 'Billing Address',
    subtitle: 'Enter the billing address',
    icon: <BallotOutlinedIcon />,
    fields: [
      quotationFields.billing_address_line_1,
      quotationFields.billing_address_line_2,
      quotationFields.billing_address_postal_code,
      quotationFields.billing_address_city,
      quotationFields.billing_address_country,
    ],
  },
  {
    key: 'order',
    title: 'Order',
    fields: [quotationFields.order_id],
  },
  {
    key: 'payment',
    title: 'Payment',
    fields: [quotationFields.payment_terms],
  },
  {
    key: 'lines',
    title: 'Lines',
    fields: [quotationFields.quotation_lines],
  },
  {
    key: 'total',
    title: 'Total',
    fields: [quotationFields.total_display],
  },
  {
    key: 'notes',
    title: 'Total',
    fields: [quotationFields.external_notes, quotationFields.internal_notes],
  },
  {
    key: 'pricing',
    title: 'Pricing',
    fields: [
      quotationFields.subtotal,
      quotationFields.discount_rate,
      quotationFields.shipping,
      quotationFields.tax,
      quotationFields.total,
    ],
    gridProps: { sx: { mb: 0 } },
  },
  {
    key: 'attachments',
    title: 'Attachment Dimensions',
    fields: [quotationFields.attachment_files],
  },
]

export const ironmongeryQuotationFormSections = [
  {
    key: 'assignee',
    title: 'Assignee',
    fields: [quotationFields.assignee_id],
  },
  {
    key: 'status',
    title: 'Status',
    fields: [quotationFields.status],
    renderReadOnly: (props) => {
      const { value } = props
      return (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={0.5}
        >
          <Typography variant="subtitle1">Status:</Typography>
          <StatusCell
            color={getColorFromStatusConfig(QUOTATION_STATUS_CONFIG)(value)}
            label={value}
          />
        </Stack>
      )
    },
  },
  {
    key: 'title',
    title: 'Quotation',
    fields: [quotationFields.title],
  },
  {
    key: 'published_at',
    title: 'Quote Date',
    fields: [quotationFields.published_at],
  },
  {
    key: 'project',
    title: 'Project',
    fields: [
      quotationFields.project_id,
      [quotationFields.currency_type, quotationFields.currency_rate],
    ],
  },
  {
    key: 'company',
    title: 'Company',
    fields: [quotationFields.company_id],
  },
  {
    key: 'contact',
    title: 'Contact',
    fields: [quotationFields.contact_id],
  },
  {
    key: 'shipping_address',
    title: 'Shipping Address',
    subtitle: 'Enter the shipping address',
    icon: <BallotOutlinedIcon />,
    fields: [
      quotationFields.shipping_address_line_1,
      quotationFields.shipping_address_line_2,
      quotationFields.shipping_address_postal_code,
      quotationFields.shipping_address_city,
      quotationFields.shipping_address_country,
      quotationFields.is_billing_address_same_as_shipping_address,
    ],
  },
  {
    key: 'billing_address',
    title: 'Billing Address',
    subtitle: 'Enter the billing address',
    icon: <BallotOutlinedIcon />,
    fields: [
      quotationFields.billing_address_line_1,
      quotationFields.billing_address_line_2,
      quotationFields.billing_address_postal_code,
      quotationFields.billing_address_city,
      quotationFields.billing_address_country,
    ],
  },
  {
    key: 'order',
    title: 'Order',
    fields: [quotationFields.order_id],
  },
  {
    key: 'payment',
    title: 'Payment',
    fields: [quotationFields.payment_terms],
  },
  {
    key: 'lines',
    title: 'Lines',
    fields: [quotationFields.ironmongery_quotation_lines],
  },
  {
    key: 'total',
    title: 'Total',
    fields: [quotationFields.total_display],
  },
  {
    key: 'notes',
    title: 'Total',
    fields: [quotationFields.external_notes, quotationFields.internal_notes],
  },
  {
    key: 'pricing',
    title: 'Pricing',
    fields: [
      quotationFields.subtotal,
      quotationFields.discount_rate,
      quotationFields.shipping,
      quotationFields.tax,
      quotationFields.total,
    ],
    gridProps: { sx: { mb: 0 } },
  },
  {
    key: 'attachments',
    title: 'Attachment Dimensions',
    fields: [quotationFields.attachment_files],
  },
]

export const quotationPreviewFormSections = quotationFormSections
export const quotationAddFormSections = quotationFormSections

export const quotationColumnDefs = [
  { field: 'title' },
  {
    field: 'assignee',
    headerName: 'Assignee',
    minWidth: 300,
    cellRenderer: ({ value }) => {
      return (
        <Stack direction="row" spacing={1} alignItems="center">
          <StorageAvatar
            src={value?.avatar_src}
            alt={value?.avatar_alt}
            size={32}
          />
          <Typography>{value?.full_name ?? '-'}</Typography>
        </Stack>
      )
    },
  },
  {
    field: 'project.title',
    module: projectModule,
    previewFormSections: projectPreviewFormSections,
    minWidth: 150,
    flex: 2,
  },
  {
    field: 'company.title',
    module: companyModule,
    previewFormSections: companyPreviewFormSections,
    minWidth: 150,
    flex: 2,
  },
  {
    field: 'contact.title',
    module: contactModule,
    previewFormSections: contactPreviewFormSections,
  },
  {
    field: 'total',
    minWidth: 100,
    flex: 1,
    valueFormatter: ({ value }) => printNumber(value),
  },
  {
    field: 'created_at',
    valueFormatter: ({ value }) => value && dayjs(value).format('DD MMM YYYY'),
  },
  {
    field: 'status',
    pinned: 'right',
    maxWidth: 125,
    cellRenderer: ({ value }) => (
      <StatusCell
        color={getColorFromStatusConfig(QUOTATION_STATUS_CONFIG)(value)}
        label={value}
      />
    ),
  },
]

export const quotationFilterFormSections = [
  createGeneralFilterFormSection([
    quotationFields.project_id,
    quotationFields.company_id,
    quotationFields.contact_id,
    [
      {
        key: 'min_total',
        name: 'min_total',
        label: 'Min Total',
        type: 'amount',
        filterKey: 'total',
        op: 'gte',
      },
      {
        key: 'max_total',
        name: 'max_total',
        label: 'Max Total',
        type: 'amount',
        filterKey: 'total',
        op: 'lte',
      },
    ],
    quotationFields.status,
  ]),
]

export const quotationFormSchema = yup.lazy((values) => {
  const { contact_id, company_id } = values
  return yup.object({
    project_id: yup.mixed().required('Project is required'),
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
