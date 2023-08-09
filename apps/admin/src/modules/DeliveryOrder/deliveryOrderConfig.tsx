import StatusCell from '@admin/components/StatusCell'
import { userModule } from '@admin/modules/User/userConfig'
import { ModelFieldWithCrud } from '@gravis-os/crud'
import { observeField } from '@gravis-os/form'
import { Typography } from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import dayjs from 'dayjs'
import { first, isEmpty, isEqual, map, sumBy } from 'lodash'
import * as React from 'react'
import ModuleLink from 'src/components/ModuleLink'
import * as yup from 'yup'
import { createGeneralFilterFormSection } from '../../utils/configHelpers'
import { getColorFromStatusConfig } from '../../utils/getColorFromStatusConfig'
import { getAssigneeField, getUserField } from '../../utils/getUserField'
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
import { deliveryInstructionModule } from '../DeliveryInstruction/deliveryInstructionModule'
import { DeliveryInstruction } from '../DeliveryInstruction/types'
import {
  projectAddFormSections,
  projectModule,
  projectPreviewFormSections,
} from '../Project/projectConfig'
import { TitleDisplayField } from '../Quotation/components'
import { getShippingAddressFieldEffectByAddressKey } from '../Quotation/utils'
import { DRIVER_ROLE } from '../Role/constants'
import { salesOrderModule } from '../SalesOrder/salesOrderConfig'
import SignatureField from './components/SignatureField'
import TotalDisplayField from './components/TotalDisplayField'
import { DELIVERY_ORDER_STATUS_CONFIG } from './constants'
import { deliveryOrderAttachmentFileModule } from './deliveryOrderAttachmentFileConfig'
import DeliveryOrderLinesFieldArray from './DeliveryOrderLinesFieldArray'
import DeliveryOrderReadOnlyDisplayField from './DeliveryOrderReadOnlyDisplayField'
import { DeliveryOrderLine } from './types'

export const deliveryOrderFields = {
  assignee_id: getAssigneeField(),
  driver_id: getUserField({
    label: 'Select Driver',
    key: 'driver_id',
    select: 'id, title, full_name, role!inner(*)',
    modelFieldProps: {
      setQuery: async ({ select }) =>
        supabaseClient
          .from(userModule.table.name)
          .select(select)
          .match({ 'role.type': DRIVER_ROLE }),
    },
  }),
  status: {
    key: 'status',
    name: 'status',
    type: 'input',
    options: map(DELIVERY_ORDER_STATUS_CONFIG, 'value'),
  },
  title: <TitleDisplayField overline="Delivery Order" />,
  created_at: {
    key: 'created_at',
    name: 'created_at',
    label: 'Created Date',
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
    fieldEffect: observeField({
      source: 'sales_order_id',
      target: 'project_id',
    }),
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
    fieldEffect: observeField({
      source: 'sales_order_id',
      target: 'company_id',
    }),
  },
  sales_order_id: {
    key: 'sales_order_id',
    name: 'sales_order_id',
    type: 'model',
    module: salesOrderModule,
    withCreate: true,
    select: '*',
    render: (props) => (
      <ModelFieldWithCrud {...props} module={salesOrderModule} />
    ),
    fieldEffect: observeField({
      source: 'sales_order_id',
      target: 'contact_id',
    }),
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
  sales_order_id_reference: {
    key: 'sales_order_id',
    name: 'sales_order_id',
    label: 'SO Reference',
    type: 'model',
    module: salesOrderModule,
  },
  delivery_at: {
    key: 'delivery_at',
    name: 'delivery_at',
    label: 'Delivery Date',
    type: 'date_time',
    dateTimePickerProps: { sx: { mb: 3 } },
  },
  driver_name: {
    key: 'driver_name',
    name: 'driver_name',
    label: 'Driver Name',
    type: 'text',
  },
  driver_contact: {
    key: 'driver_contact',
    name: 'driver_contact',
    label: 'Driver Contact',
    type: 'text',
  },
  delivery_order_lines: <DeliveryOrderLinesFieldArray />,
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
  attachment_files: {
    key: 'attachment_files',
    name: 'attachment_files',
    label: 'Delivery Order Attachments',
    type: 'files',
    module: deliveryOrderAttachmentFileModule,
  },
  delivered_on: {
    key: 'delivered_on',
    name: 'delivered_on',
    label: 'Delivered On',
    type: 'text',
  },
  received_by: {
    key: 'received_by',
    name: 'received_by',
    label: 'Received By',
    type: 'text',
  },
  customer_contact: {
    key: 'customer_contact',
    name: 'customer_contact',
    label: 'Contact Number',
    type: 'text',
  },
  signature_url: {
    key: 'signature_url',
    name: 'signature_url',
    type: 'text',
  },
}

export const deliveryOrderFormSections = [
  {
    key: 'assignee',
    title: 'Assignee',
    fields: [deliveryOrderFields.assignee_id],
  },
  {
    key: 'driver',
    title: 'Driver',
    fields: [deliveryOrderFields.driver_id],
  },
  {
    key: 'status',
    title: 'Status',
    fields: [deliveryOrderFields.status],
  },
  {
    key: 'title',
    title: 'Delivery Order',
    fields: [deliveryOrderFields.title],
  },
  {
    key: 'published_at',
    title: 'Delivery Date',
    renderReadOnly: ({ title, label }) => {
      const dateString = dayjs(title)
        .format('ddd, DD MMM YYYY, hh:mm A')
        .toString()
      return (
        <DeliveryOrderReadOnlyDisplayField
          title={dateString}
          overline={label}
          titleProps={{ variant: 'h3' }}
          stackProps={{ mb: 3, spacing: 1 }}
        />
      )
    },
    fields: [deliveryOrderFields.delivery_at],
  },
  {
    key: 'project',
    title: 'Project',
    fields: [deliveryOrderFields.project_id],
  },
  {
    key: 'company',
    title: 'Company',
    fields: [deliveryOrderFields.company_id],
  },
  {
    key: 'order',
    title: 'Sales Order',
    fields: [deliveryOrderFields.sales_order_id],
  },
  {
    key: 'contact',
    title: 'Contact',
    fields: [deliveryOrderFields.contact_id],
  },
  {
    key: 'shipping_address',
    title: 'Shipping Address',
    subtitle: 'Enter the shipping address',
    icon: <BallotOutlinedIcon />,
    fields: [
      deliveryOrderFields.shipping_address_line_1,
      deliveryOrderFields.shipping_address_line_2,
      deliveryOrderFields.shipping_address_postal_code,
      deliveryOrderFields.shipping_address_city,
      deliveryOrderFields.shipping_address_country,
    ],
  },
  {
    key: 'sales_order',
    title: 'Sales Order',
    fields: [deliveryOrderFields.sales_order_id_reference],
  },
  {
    key: 'delivery_at',
    title: 'Created Date',
    isReadOnly: true,
    renderReadOnly: ({ title, label }) => {
      const dateString = dayjs(title).format('DD MMM YYYY').toString()
      return (
        <DeliveryOrderReadOnlyDisplayField
          title={dateString}
          overline={label}
          stackProps={{ textAlign: 'right' }}
        />
      )
    },
    fields: [deliveryOrderFields.created_at],
  },
  {
    key: 'driver',
    title: 'Driver',
    fields: [
      deliveryOrderFields.driver_name,
      deliveryOrderFields.driver_contact,
    ],
  },
  {
    key: 'lines',
    title: 'Lines',
    fields: [deliveryOrderFields.delivery_order_lines],
  },
  {
    key: 'total',
    title: 'Total',
    fields: [deliveryOrderFields.total_display],
  },
  {
    key: 'notes',
    title: 'Notes',
    fields: [
      deliveryOrderFields.external_notes,
      deliveryOrderFields.internal_notes,
    ],
  },
  {
    key: 'attachments',
    title: 'Attachment Dimensions',
    fields: [deliveryOrderFields.attachment_files],
  },
  {
    key: 'delivery_details',
    title: 'Delivery Details',
    isReadOnly: true,
    renderReadOnly: (props) => {
      const { title, label, name } = props
      const date = dayjs(title)
      const isDate = isEqual(name, deliveryOrderFields.delivered_on.name)
      const titleText = isDate ? date.format('DD MMM YYYY hh:mm A') : title
      return (
        <DeliveryOrderReadOnlyDisplayField
          title={titleText}
          overline={label}
          stackProps={{ textAlign: 'right' }}
        />
      )
    },
    fields: [
      [
        deliveryOrderFields.delivered_on,
        deliveryOrderFields.received_by,
        deliveryOrderFields.customer_contact,
      ],
    ],
  },
  {
    key: 'signature',
    title: 'signature',
    isReadOnly: true,
    renderReadOnly: ({ title }) => {
      return <SignatureField url={title} />
    },
    fields: [deliveryOrderFields.signature_url],
  },
]

export const deliveryOrderFilterFormSections = [
  createGeneralFilterFormSection([
    deliveryOrderFields.project_id,
    deliveryOrderFields.company_id,
    deliveryOrderFields.contact_id,
    deliveryOrderFields.status,
  ]),
]

export const deliveryOrderPreviewFormSections = deliveryOrderFormSections
export const deliveryOrderAddFormSections = deliveryOrderFormSections

export const deliveryOrderColumnDefs = [
  { field: 'title' },
  {
    field: 'delivery_instruction',
    headerName: 'PP Ref',
    valueGetter: ({ data }) =>
      first(data.delivery_instruction as DeliveryInstruction[])?.title,
    cellRenderer: ({ data }) => {
      const deliveryInstructions =
        data.delivery_instruction as DeliveryInstruction[]
      const deliveryInstruction = first(deliveryInstructions)
      if (isEmpty(deliveryInstruction)) return null
      return (
        <>
          <ModuleLink
            module={deliveryInstructionModule}
            item={deliveryInstruction}
          />
          {deliveryInstructions?.length > 1 &&
            ` +${deliveryInstructions?.length - 1} more`}
        </>
      )
    },
  },
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
  {
    field: 'delivery_at',
    valueFormatter: ({ value }) =>
      value ? dayjs(value).format('DD MMM YYYY HH:mm') : '',
  },
  {
    field: 'lines',
    headerName: 'Total Amount',
    cellRenderer: ({ value }) => {
      return (
        <Typography>
          {printAmount(
            sumBy(
              value,
              ({ unit_price: unitPrice, quantity }: DeliveryOrderLine) =>
                (unitPrice ?? 1) * quantity
            )
          )}
        </Typography>
      )
    },
  },
  {
    field: 'status',
    maxWidth: 150,
    cellRenderer: ({ value }) => (
      <StatusCell
        color={getColorFromStatusConfig(DELIVERY_ORDER_STATUS_CONFIG)(value)}
        label={value}
      />
    ),
  },
]

export const deliveryOrderFormSchema = yup.lazy((values) => {
  const { contact_id, company_id } = values
  return yup.object({
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
    sales_order_id: yup.mixed().required('Sales Order is required'),
  })
})
