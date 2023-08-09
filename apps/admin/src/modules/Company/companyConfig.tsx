import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import { routes } from '@admin/app/routes'
import { companyFileModule } from './companyFileConfig'
import {
  AddressKey,
  CompanyType,
  IS_BILLING_ADDRESS_SAME_AS_SHIPPING_ADDRESS_KEY,
  PrefixFieldKey,
  SectionKey,
} from './constants'
import {
  getBillingAddressFieldEffectByAddressKey,
  getIsBillingAddressFieldDisabled,
} from './utils'

export const companyFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up company details',
    icon: <BallotOutlinedIcon />,
    fields: [
      {
        key: 'avatar_src',
        name: 'avatar_src',
        type: 'image',
        hidden: ({ isDetail }) => isDetail,
      },
      {
        key: 'title',
        name: 'title',
        label: 'Company Name',
        type: 'input',
        required: true,
      },
      {
        key: 'type',
        name: 'type',
        type: 'input',
        options: Object.values(CompanyType),
      },
      { key: 'subtitle', name: 'subtitle', type: 'input' },
      { key: 'description', name: 'description', type: 'input' },
    ],
  },
  {
    key: 'contact',
    title: 'Contact',
    subtitle: 'Fill up company details',
    icon: <BallotOutlinedIcon />,
    fields: [
      { key: 'email', name: 'email', type: 'input' },
      [
        { key: 'mobile', name: 'mobile', type: 'input' },
        { key: 'phone', name: 'phone', type: 'input' },
        { key: 'fax', name: 'fax', type: 'input' },
      ],
    ],
  },
  {
    key: SectionKey.ShippingAddress,
    title: 'Shipping Address',
    subtitle: 'Enter the shipping address',
    icon: <BallotOutlinedIcon />,
    fields: [
      {
        key: PrefixFieldKey.ShippingAddress.concat(AddressKey.Line1),
        name: PrefixFieldKey.ShippingAddress.concat(AddressKey.Line1),
        type: 'input',
      },
      [
        {
          key: PrefixFieldKey.ShippingAddress.concat(AddressKey.Line2),
          name: PrefixFieldKey.ShippingAddress.concat(AddressKey.Line2),
          type: 'input',
        },
        {
          key: PrefixFieldKey.ShippingAddress.concat(AddressKey.PostalCode),
          name: PrefixFieldKey.ShippingAddress.concat(AddressKey.PostalCode),
          type: 'input',
        },
      ],
      [
        {
          key: PrefixFieldKey.ShippingAddress.concat(AddressKey.City),
          name: PrefixFieldKey.ShippingAddress.concat(AddressKey.City),
          type: 'input',
        },
        {
          key: PrefixFieldKey.ShippingAddress.concat(AddressKey.Country),
          name: PrefixFieldKey.ShippingAddress.concat(AddressKey.Country),
          type: 'input',
        },
      ],
    ],
  },
  {
    key: SectionKey.BillingAddress,
    title: 'Billing Address',
    subtitle: 'Enter the billing address',
    icon: <BallotOutlinedIcon />,
    fields: [
      {
        key: PrefixFieldKey.BillingAddress.concat(AddressKey.Line1),
        name: PrefixFieldKey.BillingAddress.concat(AddressKey.Line1),
        type: 'input',
        fieldEffect: getBillingAddressFieldEffectByAddressKey({
          addressKey: AddressKey.Line1,
        }),
        disabled: getIsBillingAddressFieldDisabled,
      },
      [
        {
          key: PrefixFieldKey.BillingAddress.concat(AddressKey.Line2),
          name: PrefixFieldKey.BillingAddress.concat(AddressKey.Line2),
          type: 'input',
          fieldEffect: getBillingAddressFieldEffectByAddressKey({
            addressKey: AddressKey.Line2,
          }),
          disabled: getIsBillingAddressFieldDisabled,
        },
        {
          key: PrefixFieldKey.BillingAddress.concat(AddressKey.PostalCode),
          name: PrefixFieldKey.BillingAddress.concat(AddressKey.PostalCode),
          type: 'input',
          fieldEffect: getBillingAddressFieldEffectByAddressKey({
            addressKey: AddressKey.PostalCode,
          }),
          disabled: getIsBillingAddressFieldDisabled,
        },
      ],
      [
        {
          key: PrefixFieldKey.BillingAddress.concat(AddressKey.City),
          name: PrefixFieldKey.BillingAddress.concat(AddressKey.City),
          type: 'input',
          fieldEffect: getBillingAddressFieldEffectByAddressKey({
            addressKey: AddressKey.City,
          }),
          disabled: getIsBillingAddressFieldDisabled,
        },
        {
          key: PrefixFieldKey.BillingAddress.concat(AddressKey.Country),
          name: PrefixFieldKey.BillingAddress.concat(AddressKey.Country),
          type: 'input',
          fieldEffect: getBillingAddressFieldEffectByAddressKey({
            addressKey: AddressKey.Country,
          }),
          disabled: getIsBillingAddressFieldDisabled,
        },
      ],
      {
        key: IS_BILLING_ADDRESS_SAME_AS_SHIPPING_ADDRESS_KEY,
        name: IS_BILLING_ADDRESS_SAME_AS_SHIPPING_ADDRESS_KEY,
        type: 'switch',
      },
    ],
  },
  {
    key: 'files',
    title: 'Files',
    subtitle: 'Manage company files',
    icon: <BallotOutlinedIcon />,
    fields: [
      {
        key: 'files',
        name: 'company_file',
        label: 'Company Files',
        type: 'files',
        module: companyFileModule,
      },
    ],
  },
]

export const companyModule = {
  sk: 'slug',
  table: {
    name: 'company',
  },
  name: {
    singular: 'Company',
    plural: 'Companies',
  },
  route: {
    plural: routes.COMPANYS,
  },
  select: {
    list: '*',
    detail: '*, company_file(*)',
  },
  relations: {
    files: { table: { name: 'company_file' } },
  },
  Icon: WorkOutlineOutlinedIcon,
}

export const companyColumnDefs = [
  { field: 'title', hasAvatar: true, minWidth: 300 },
  { field: 'type' },
]

export const companySearchFormSections = [
  {
    key: 'general',
    fields: [{ key: 'title', name: 'title', type: 'input', op: 'ilike' }],
  },
]

export const companyFilterFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up company details',
    icon: <BallotOutlinedIcon />,
    fields: [
      {
        key: 'type',
        name: 'type',
        type: 'input',
        options: ['Supplier', 'Customer'],
      },
    ],
  },
]

export const companyPreviewFormSections = companyFormSections
export const companyAddFormSections = companyFormSections
