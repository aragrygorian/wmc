import React from 'react'
import { printNumber } from '@gravis-os/utils'
import { ModelFieldWithCrud } from '@gravis-os/crud'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import dayjs from 'dayjs'
import { uniq } from 'lodash'
import * as yup from 'yup'
import StatusCell from '@admin/components/StatusCell'
import SubtotalField from '@admin/components/SubtotalField'
import ShippingField from '@admin/components/ShippingField'
import TotalField from '@admin/components/TotalField'
import TaxField from '@admin/components/TaxField'
import map from 'lodash/map'
import { getColorFromStatusConfig } from '@admin/utils/getColorFromStatusConfig'
import AdditionalDiscountField from '@admin/components/AdditionalDiscountField'
import TotalDisplayField from '../../components/TotalDisplayField'
import {
  companyAddFormSections,
  companyModule,
  companyPreviewFormSections,
} from '../Company/companyConfig'
import { contactAddFormSections, contactModule } from '../Contact'
import {
  PublishedAtDisplayField,
  TitleDisplayField,
} from '../Quotation/components'
import { getShippingAddressFieldEffectByAddressKey } from './utils'
import { purchaseOrderAttachmentFileModule } from './purchaseOrderAttachmentFileConfig'
import PurchaseOrderLinesFieldArray from './components/PurchaseOrderLinesFieldArray'
import {
  warehouseAddFormSections,
  warehouseModule,
} from '../Warehouse/warehouseConfig'
import UserCell from '../../components/UserCell'
import { PURCHASE_ORDER_STATUS_CONFIG, SHIPPING_OPTIONS } from './constants'
import {
  createGeneralFilterFormSection,
  createMinMaxAmountFilterField,
} from '../../utils/configHelpers'
import { getAssigneeField } from '../../utils/getUserField'
import { currencyFactorModule } from '../CurrencyFactor/currencyFactorConfig'

export const purchaseOrderFields = {
  assignee_id: getAssigneeField(),
  status: {
    key: 'status',
    name: 'status',
    type: 'input',
    options: map(PURCHASE_ORDER_STATUS_CONFIG, 'value'),
  },
  title: <TitleDisplayField overline="Purchase Order" />,
  published_at: <PublishedAtDisplayField overline="Purchase Order Date" />,
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
        return currencyFactor.buy_rate
      },
    },
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
  warehouse_id: {
    key: 'warehouse_id',
    name: 'warehouse_id',
    type: 'model',
    module: warehouseModule,
    withCreate: true,
    select: '*',
    label: 'Warehouse',
    render: (props) => (
      <ModelFieldWithCrud
        {...props}
        module={warehouseModule}
        addFormSections={warehouseAddFormSections}
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
    disabled: true,
  },
  shipping_address_line_2: {
    key: 'shipping_address_line_2',
    name: 'shipping_address_line_2',
    type: 'input',
    fieldEffect: getShippingAddressFieldEffectByAddressKey({
      addressKey: 'line_2',
    }),
    disabled: true,
  },
  shipping_address_postal_code: {
    key: 'shipping_address_postal_code',
    name: 'shipping_address_postal_code',
    type: 'input',
    fieldEffect: getShippingAddressFieldEffectByAddressKey({
      addressKey: 'postal_code',
    }),
    disabled: true,
  },
  shipping_address_city: {
    key: 'shipping_address_city',
    name: 'shipping_address_city',
    type: 'input',
    fieldEffect: getShippingAddressFieldEffectByAddressKey({
      addressKey: 'city',
    }),
    disabled: true,
  },
  shipping_address_country: {
    key: 'shipping_address_country',
    name: 'shipping_address_country',
    type: 'input',
    fieldEffect: getShippingAddressFieldEffectByAddressKey({
      addressKey: 'country',
    }),
    disabled: true,
  },
  ready_at: {
    key: 'ready_at',
    name: 'ready_at',
    label: 'Est Goods Ready Date',
    type: 'date',
  },
  arrived_at: {
    key: 'arrived_at',
    name: 'arrived_at',
    label: 'Est Time of Arrival',
    type: 'date',
  },
  ship_via: {
    key: 'ship_via',
    name: 'ship_via',
    label: 'Ship Via',
    type: 'input',
    options: SHIPPING_OPTIONS,
  },
  shipped_at: {
    key: 'shipped_at',
    name: 'shipped_at',
    label: 'Shipping Date',
    type: 'date',
  },
  purchase_order_lines: <PurchaseOrderLinesFieldArray />,
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
  discount_rate: <AdditionalDiscountField />,
  shipping: <ShippingField />,
  tax: <TaxField />,
  total: <TotalField />,
  amount_payable_due: (
    <TotalField key="amount_payable_due" label="Amount Payable Due" />
  ),
  attachment_files: {
    key: 'attachment_files',
    name: 'attachment_files',
    label: 'Purchase Order Attachments',
    type: 'files',
    module: purchaseOrderAttachmentFileModule,
  },
}

export const purchaseOrderFormSections = [
  {
    key: 'assignee',
    title: 'Assignee',
    fields: [purchaseOrderFields.assignee_id],
  },
  {
    key: 'status',
    title: 'Status',
    fields: [purchaseOrderFields.status],
  },
  {
    key: 'title',
    title: 'Purchase Order',
    fields: [purchaseOrderFields.title],
  },
  {
    key: 'published_at',
    title: 'Purchase Order Date',
    fields: [purchaseOrderFields.published_at],
  },
  {
    key: 'company',
    title: 'Company',
    fields: [
      purchaseOrderFields.company_id,
      [purchaseOrderFields.currency_type, purchaseOrderFields.currency_rate],
    ],
  },
  {
    key: 'contact',
    title: 'Contact',
    fields: [purchaseOrderFields.contact_id],
  },
  {
    key: 'warehouse',
    title: 'Warehouse',
    fields: [purchaseOrderFields.warehouse_id],
  },
  {
    key: 'shipping_address',
    title: 'Shipping Address',
    subtitle: 'Enter the shipping address',
    icon: <BallotOutlinedIcon />,
    fields: [
      purchaseOrderFields.shipping_address_line_1,
      purchaseOrderFields.shipping_address_line_2,
      purchaseOrderFields.shipping_address_postal_code,
      purchaseOrderFields.shipping_address_city,
      purchaseOrderFields.shipping_address_country,
    ],
  },
  {
    key: 'ready_at',
    title: 'Est Goods Ready Date',
    fields: [purchaseOrderFields.ready_at],
  },
  {
    key: 'arrived_at',
    title: 'Est Time of Arrival',
    fields: [purchaseOrderFields.arrived_at],
  },
  {
    key: 'ship_via',
    title: 'Ship Via',
    fields: [purchaseOrderFields.ship_via],
  },
  {
    key: 'shipped_at',
    title: 'Shipping Date',
    fields: [purchaseOrderFields.shipped_at],
  },
  {
    key: 'lines',
    title: 'Lines',
    fields: [purchaseOrderFields.purchase_order_lines],
  },
  {
    key: 'total',
    title: 'Total',
    fields: [purchaseOrderFields.total_display],
  },
  {
    key: 'notes',
    title: 'Notes',
    fields: [
      purchaseOrderFields.external_notes,
      purchaseOrderFields.internal_notes,
    ],
  },
  {
    key: 'pricing',
    title: 'Pricing',
    fields: [
      purchaseOrderFields.subtotal,
      purchaseOrderFields.discount_rate,
      purchaseOrderFields.shipping,
      purchaseOrderFields.tax,
      purchaseOrderFields.total,
      purchaseOrderFields.amount_payable_due,
    ],
    gridProps: { sx: { mb: 0 } },
  },
  {
    key: 'attachments',
    title: 'Attachment Dimensions',
    fields: [purchaseOrderFields.attachment_files],
  },
]

export const purchaseOrderPreviewFormSections = purchaseOrderFormSections

export const purchaseOrderFilterFormSections = [
  createGeneralFilterFormSection([
    purchaseOrderFields.company_id,
    createMinMaxAmountFilterField('total'),
    purchaseOrderFields.status,
  ]),
]

export const purchaseOrderColumnDefs = [
  { field: 'title', headerName: 'PO ID' },
  {
    field: 'lines',
    headerName: 'OF Ref',
    valueGetter: ({ data }) =>
      uniq(
        data.lines
          .map(({ order_form_line }) => order_form_line?.order_form.title ?? '')
          .filter(Boolean)
      ).join(', '),
    valueFormatter: ({ value }) => {
      const titles = value.split(',') as string[]
      const [title] = titles
      const moreCount = titles.length - 1
      if (moreCount) return title?.concat(` +${moreCount} more`)
      return title
    },
  },
  {
    field: 'company.title',
    headerName: 'Supplier',
    module: companyModule,
    previewFormSections: companyPreviewFormSections,
  },
  {
    field: 'assignee.email',
    headerName: 'Assignee',
  },
  { field: 'total', valueFormatter: ({ value }) => printNumber(value) },
  {
    field: 'arrived_at',
    headerName: 'ETA',
    valueFormatter: ({ value }) => value && dayjs(value).format('DD MMM YYYY'),
  },
  { field: 'created_by', cellRenderer: ({ value }) => <UserCell id={value} /> },
  {
    field: 'created_at',
    valueFormatter: ({ value }) => value && dayjs(value).format('DD MMM YYYY'),
  },
  {
    field: 'status',
    pinned: 'right',
    maxWidth: 150,
    cellRenderer: ({ value }) => (
      <StatusCell
        color={getColorFromStatusConfig(PURCHASE_ORDER_STATUS_CONFIG)(value)}
        label={value}
      />
    ),
  },
]

export const purchaseOrderFormSchema = yup.object({
  company_id: yup.mixed().required('Supplier is required'),
  warehouse_id: yup.mixed().required('Warehouse is required'),
})
