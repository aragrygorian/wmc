import { routes } from '@admin/app/routes'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import React from 'react'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import { printAmount } from '@gravis-os/utils'
import { productPreviewFormSections } from '../Product/productConfig'
import productModule from '../Product/productModule'
import { brandModule } from '../Brand/brandConfig'
import { projectBrandModule } from './projectBrandConfig'
import { companyModule } from '../Company/companyConfig'

export const getProjectProductFormSections = ({ projectId }) => [
  {
    key: 'general',
    title: 'General',
    icon: <BallotOutlinedIcon />,
    fields: [
      {
        key: 'project_brand_id',
        name: 'project_brand_id',
        type: 'model',
        module: projectBrandModule,
        pk: 'brand.title',
        select: '*, brand(id, title, company:company_id(title))',
        // TODO: Use server side filter
        filterOptions: (options) =>
          options.filter(
            (option) =>
              option.project_id === projectId &&
              !option.discount_rate &&
              !option.additional_discount_rate
          ),
        groupBy: ({ brand }) => brand.company.title,
        optionLabelKey: 'brand.title',
        getOptionLabel: ({ brand: { title, company } }) =>
          `${title} (${company.title})`,
        label: 'Brand',
        required: true,
      },
      {
        key: 'product_id',
        name: 'product_id',
        type: 'model',
        module: productModule,
        render: (props) => {
          const { formContext, children } = props
          const { watch } = formContext
          const projectBrand = watch('project_brand_id')
          return React.cloneElement(children, {
            filters: [
              { pk: 'brand_id', op: 'eq', value: projectBrand?.brand.id },
            ],
          })
        },
        label: 'Product',
        required: true,
      },
    ],
  },
  {
    key: 'pricing',
    title: 'Pricing',
    icon: <MonetizationOnOutlinedIcon />,
    fields: [
      {
        key: 'supplier_cost_amount',
        name: 'supplier_cost_amount',
        type: 'amount',
        label: 'Special Unit Rate',
        required: true,
      },
    ],
  },
]

export const projectProductModule = {
  sk: 'id',
  table: {
    name: 'project_product',
    isJoinTable: true,
  },
  name: {
    singular: 'Product Discount',
    plural: 'Product Discounts',
  },
  route: {
    plural: routes.PROJECTS,
  },
  select: {
    list: '*, product(id, title, slug, model_code, brand(id, title, slug, company:company_id(title, slug)))',
    detail:
      '*, product(*), project_brand(*, brand(title, company:company_id(title)))',
  },
}

export const projectProductColumnDefs = [
  { field: 'product.model_code', headerName: 'Model Code' },
  {
    field: 'product.title',
    headerName: 'Product',
    module: productModule,
    previewFormSections: productPreviewFormSections,
  },
  {
    field: 'product.brand.title',
    headerName: 'Brand',
    module: brandModule,
  },
  {
    field: 'product.brand.company.title',
    headerName: 'Company',
    module: companyModule,
  },
  {
    field: 'supplier_cost_amount',
    headerName: 'Special Unit Rate',
    valueFormatter: ({ value }) => printAmount(value),
  },
]

export const getProjectProductPreviewFormSections =
  getProjectProductFormSections

export const getProjectProductAddFormSections = getProjectProductFormSections
