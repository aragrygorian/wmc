import React from 'react'
import dayjs from 'dayjs'
import { FormSectionProps } from '@gravis-os/form'
import map from 'lodash/map'
import StatusCell from '@admin/components/StatusCell'
import { getColorFromStatusConfig } from '@admin/utils/getColorFromStatusConfig'
import { DELIVERY_INSTRUCTION_STATUS_CONFIG } from '@admin/modules/DeliveryInstruction/constants'
import { TitleDisplayField } from '../Quotation/components'
import DeliveryInstructionFieldArray from './components/DeliveryInstructionFieldArray'
import CreatedAtDisplayField from '../SupplierInvoice/components/CreatedAtDisplayField'
import LinkDisplayField from './components/LinkDisplayField'
import { createGeneralFilterFormSection } from '../../utils/configHelpers'
import { deliveryOrderModule } from '../DeliveryOrder/deliveryOrderModule'
import { warehouseModule } from '../Warehouse/warehouseConfig'

export const deliveryInstructionFields = {
  delivery_order_id: {
    key: 'delivery_order_id',
    name: 'delivery_order_id',
    type: 'model',
    module: deliveryOrderModule,
  },
  warehouse_id: {
    key: 'warehouse_id',
    name: 'warehouse_id',
    type: 'model',
    module: warehouseModule,
  },
  delivery_order: {
    driver_name: {
      key: 'delivery_order.driver_name',
      name: 'delivery_order.driver_name',
      label: 'Driver',
      disabled: true,
    },
    project: {
      title: {
        key: 'delivery_order.project.title',
        name: 'delivery_order.project.title',
        label: 'Project',
        disabled: true,
      },
    },
  },
  status: {
    key: 'status',
    name: 'status',
    type: 'input',
    options: map(DELIVERY_INSTRUCTION_STATUS_CONFIG, 'value'),
  },
  title: <TitleDisplayField overline="Pick & Pack" />,
  created_at: (
    <CreatedAtDisplayField
      overline="Created At"
      stackProps={{ sx: { textAlign: 'right' } }}
      textProps={{ variant: 'h4' }}
    />
  ),
  warehouse: {
    title: {
      key: 'warehouse.title',
      label: 'Warehouse',
      name: 'warehouse.title',
      disabled: true,
    },
  },
  delivery_order_ref: (
    <LinkDisplayField
      name="delivery_order"
      overline="Delivery Order Reference"
      stackProps={{ sx: { textAlign: 'right' } }}
    />
  ),
  published_at: <CreatedAtDisplayField overline="Pick Up Date" />,
  delivery_instruction_lines: <DeliveryInstructionFieldArray />,
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
}

export const deliveryInstructionFormSections: FormSectionProps[] = [
  {
    key: 'salesperson',
    title: 'Driver',
    fields: [deliveryInstructionFields.delivery_order.driver_name],
  },
  {
    key: 'status',
    title: 'Status',
    fields: [deliveryInstructionFields.status],
  },
  {
    key: 'title',
    title: 'Delivery Instruction',
    fields: [deliveryInstructionFields.title],
  },
  {
    key: 'shipped_at',
    fields: [deliveryInstructionFields.created_at],
  },
  {
    key: 'project',
    title: 'Project',
    fields: [deliveryInstructionFields.delivery_order.project.title],
  },
  {
    key: 'company',
    title: 'Warehouse',
    fields: [deliveryInstructionFields.warehouse.title],
  },
  {
    key: 'order',
    fields: [deliveryInstructionFields.delivery_order_ref],
  },
  {
    key: 'published_at',
    fields: [deliveryInstructionFields.published_at],
  },
  {
    key: 'lines',
    title: 'Lines',
    fields: [deliveryInstructionFields.delivery_instruction_lines],
  },
  {
    key: 'notes',
    title: 'Notes',
    fields: [
      deliveryInstructionFields.external_notes,
      deliveryInstructionFields.internal_notes,
    ],
  },
]

export const deliveryInstructionFilterFormSections = [
  createGeneralFilterFormSection([
    deliveryInstructionFields.delivery_order_id,
    deliveryInstructionFields.warehouse_id,
    deliveryInstructionFields.status,
  ]),
]

export const deliveryInstructionColumnDefs = [
  { field: 'title' },
  { field: 'delivery_order.title', headerName: 'DO Ref' },
  { field: 'delivery_order.project.title', headerName: 'Project Name' },
  { field: 'warehouse.title', headerName: 'Pick Up Location' },
  {
    field: 'warehouse',
    headerName: 'Address',
    cellRenderer: ({ data }) => {
      const { warehouse } = data
      const {
        address_city,
        address_country,
        address_line_1,
        address_line_2,
        address_postal_code,
      } = warehouse

      return [
        address_line_1,
        address_line_2,
        [address_city, address_country].filter(Boolean).join(' '),
        address_postal_code,
      ].map((part, index, array) => (
        <>
          {part}
          {array.length - 1 !== index && <br />}
        </>
      ))
    },
  },
  {
    field: 'pick_up_at',
    headerName: 'Pick Up Date',
    valueFormatter: ({ value }) =>
      value ? dayjs(value).format('DD MMM YYYY') : '',
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    valueFormatter: ({ value }) =>
      value ? dayjs(value).format('DD MMM YYYY') : '',
  },
  {
    field: 'status',
    maxWidth: 150,
    cellRenderer: ({ value }) => (
      <StatusCell
        color={getColorFromStatusConfig(DELIVERY_INSTRUCTION_STATUS_CONFIG)(
          value
        )}
        label={value}
      />
    ),
  },
]
