import React from 'react'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import { routes } from '@admin/app/routes'
import productModule from '../Product/productModule'
import { createGeneralFilterFormSection } from '../../utils/configHelpers'

export const warehouseFields = {
  title: { key: 'title', name: 'title', type: 'input', required: true },
  subtitle: { key: 'subtitle', name: 'subtitle', type: 'input' },
  description: { key: 'description', name: 'description', type: 'input' },
  product_ids: {
    key: 'product_ids',
    name: 'product_ids',
    type: 'model',
    module: productModule,
    multiple: true,
  },
  address_line_1: {
    key: 'address_line_1',
    name: 'address_line_1',
    type: 'input',
  },
  address_line_2: {
    key: 'address_line_2',
    name: 'address_line_2',
    type: 'input',
  },
  address_postal_code: {
    key: 'address_postal_code',
    name: 'address_postal_code',
    type: 'input',
  },
  address_city: { key: 'address_city', name: 'address_city', type: 'input' },
  address_country: {
    key: 'address_country',
    name: 'address_country',
    type: 'input',
  },
  status: {
    key: 'status',
    name: 'status',
    type: 'input',
    options: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
  },
}

export const warehouseFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up general info',
    icon: <StorefrontOutlinedIcon />,
    fields: [
      warehouseFields.title,
      warehouseFields.subtitle,
      warehouseFields.description,
      warehouseFields.product_ids,
    ],
  },
  {
    key: 'location',
    title: 'Location',
    icon: <StorefrontOutlinedIcon />,
    fields: [
      warehouseFields.address_line_1,
      warehouseFields.address_line_2,
      warehouseFields.address_postal_code,
      warehouseFields.address_city,
      warehouseFields.address_country,
    ],
  },
  {
    key: 'status',
    title: 'Status',
    icon: <StorefrontOutlinedIcon />,
    fields: [warehouseFields.status],
  },
]

export const warehouseModule = {
  sk: 'slug',
  table: {
    name: 'warehouse',
  },
  name: {
    singular: 'Location',
    plural: 'Locations',
  },
  route: {
    plural: routes.WAREHOUSES,
  },
  select: {
    detail: '*, product_ids:product!warehouse_product(*)',
    list: '*',
  },
  Icon: StorefrontOutlinedIcon,
}

export const warehouseColumnDefs = [
  { field: 'title', headerName: 'Warehouse' },
  { field: 'address_line_1' },
  { field: 'address_line_2' },
  { field: 'address_postal_code', headerName: 'Postal Code' },
  { field: 'address_city', headerName: 'City' },
  { field: 'address_country', headerName: 'Country' },
  { field: 'status' },
]

export const warehouseFilterFormSections = [
  createGeneralFilterFormSection([
    { ...warehouseFields.address_line_1, op: 'ilike' },
    { ...warehouseFields.address_line_2, op: 'ilike' },
    { ...warehouseFields.address_postal_code, op: 'ilike' },
    [
      { ...warehouseFields.address_city, op: 'ilike' },
      { ...warehouseFields.address_country, op: 'ilike' },
    ],
    warehouseFields.status,
  ]),
]

export const warehousePreviewFormSections = warehouseFormSections
export const warehouseAddFormSections = warehouseFormSections
