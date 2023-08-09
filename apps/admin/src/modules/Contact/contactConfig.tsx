import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import {
  companyModule,
  companyPreviewFormSections,
} from '../Company/companyConfig'
import { createGeneralFilterFormSection } from '../../utils/configHelpers'

export const contactFields = {
  avatar_src: { key: 'avatar_src', name: 'avatar_src', type: 'image' },
  title: { key: 'title', name: 'title', type: 'input', required: true },
  company_id: {
    key: 'company_id',
    name: 'company_id',
    type: 'model',
    module: companyModule,
  },
  subtitle: { key: 'subtitle', name: 'subtitle', type: 'input' },
  description: { key: 'description', name: 'description', type: 'input' },
  email: { key: 'email', name: 'email', type: 'input' },
  mobile: { key: 'mobile', name: 'mobile', type: 'input' },
  phone: { key: 'phone', name: 'phone', type: 'input' },
  fax: { key: 'fax', name: 'fax', type: 'input' },
  shipping_address_line_1: {
    key: 'shipping_address_line_1',
    name: 'shipping_address_line_1',
    type: 'input',
  },
  shipping_address_line_2: {
    key: 'shipping_address_line_2',
    name: 'shipping_address_line_2',
    type: 'input',
  },
  shipping_address_postal_code: {
    key: 'shipping_address_postal_code',
    name: 'shipping_address_postal_code',
    type: 'input',
  },
  shipping_address_city: {
    key: 'shipping_address_city',
    name: 'shipping_address_city',
    type: 'input',
  },
  shipping_address_country: {
    key: 'shipping_address_country',
    name: 'shipping_address_country',
    type: 'input',
  },
  billing_address_line_1: {
    key: 'billing_address_line_1',
    name: 'billing_address_line_1',
    type: 'input',
  },
  billing_address_line_2: {
    key: 'billing_address_line_2',
    name: 'billing_address_line_2',
    type: 'input',
  },
  billing_address_postal_code: {
    key: 'billing_address_postal_code',
    name: 'billing_address_postal_code',
    type: 'input',
  },
  billing_address_city: {
    key: 'billing_address_city',
    name: 'billing_address_city',
    type: 'input',
  },
  billing_address_country: {
    key: 'billing_address_country',
    name: 'billing_address_country',
    type: 'input',
  },
  is_billing_address_same_as_shipping_address: {
    key: 'is_billing_address_same_as_shipping_address',
    name: 'is_billing_address_same_as_shipping_address',
    type: 'switch',
  },
}

export const contactFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up general info',
    icon: <BallotOutlinedIcon />,
    fields: [
      contactFields.avatar_src,
      contactFields.title,
      contactFields.company_id,
    ],
  },
  {
    key: 'details',
    title: 'Details',
    subtitle: 'Fill up details',
    icon: <BallotOutlinedIcon />,
    fields: [contactFields.subtitle, contactFields.description],
  },
  {
    key: 'contact',
    title: 'Contact',
    subtitle: 'Fill up contact details',
    icon: <BallotOutlinedIcon />,
    fields: [
      contactFields.email,
      [contactFields.mobile, contactFields.phone, contactFields.fax],
    ],
  },
  {
    key: 'shipping-address',
    title: 'Shipping Address',
    subtitle: 'Enter the shipping address',
    icon: <BallotOutlinedIcon />,
    fields: [
      contactFields.shipping_address_line_1,
      [
        contactFields.shipping_address_line_2,
        contactFields.shipping_address_postal_code,
      ],
      [
        contactFields.shipping_address_city,
        contactFields.shipping_address_country,
      ],
    ],
  },
  {
    key: 'billing-address',
    title: 'Billing Address',
    subtitle: 'Enter the billing address',
    icon: <BallotOutlinedIcon />,
    fields: [
      contactFields.billing_address_line_1,
      [
        contactFields.billing_address_line_2,
        contactFields.billing_address_postal_code,
      ],
      [
        contactFields.billing_address_city,
        contactFields.billing_address_country,
      ],
      contactFields.is_billing_address_same_as_shipping_address,
    ],
  },
]

export const contactColumnDefs = [
  { field: 'title', minWidth: 250, hasAvatar: true },
  {
    field: 'company.title',
    headerName: 'Company',
    minWidth: 120,
    module: companyModule,
    previewFormSections: companyPreviewFormSections,
  },
]

export const contactFilterFormSections = [
  createGeneralFilterFormSection([contactFields.company_id]),
]

export const contactPreviewFormSections = contactFormSections
export const contactAddFormSections = contactFormSections
