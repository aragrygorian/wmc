import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import { printAmount } from '@gravis-os/utils'
import { StatStack } from '@gravis-os/ui'
import { FormSectionProps } from '@gravis-os/form'
import { useWatch } from 'react-hook-form'
import useUser from '@admin/app/useUser'
import { brandModule, brandPreviewFormSections } from '../Brand/brandConfig'
import {
  companyModule,
  companyPreviewFormSections,
} from '../Company/companyConfig'
import { categoryModule } from '../Category/categoryConfig'
import {
  getRetailPriceAmount,
  getSalespersonCostAmount,
  getCompanyCostAmount,
} from './productUtils'
import { warehouseModule } from '../Warehouse/warehouseConfig'
import productModule from './productModule'
import { productSpecFileModule } from './productSpecFileConfig'
import { productSpecImageModule } from './productSpecImageConfig'
import { productGalleryImageModule } from './productGalleryImageConfig'

const ProductPrices = (props) => {
  const { item, formContext } = props
  const { control } = formContext

  const [supplier_cost_amount, brand] = useWatch({
    control,
    name: ['supplier_cost_amount', 'brand'],
  })

  const brandItem = brand || item?.brand

  const priceArgs = { ...brandItem, supplier_cost_amount }
  const salespersonCostAmount = printAmount(getSalespersonCostAmount(priceArgs))
  const retailPriceAmount = printAmount(getRetailPriceAmount(priceArgs))
  const companyCostAmount = printAmount(getCompanyCostAmount(priceArgs), {
    currency: brandItem?.currency_factor?.title,
  })

  const { user } = useUser()
  const isAdmin = user?.role?.title === 'Admin'

  const adminItems = [
    {
      key: 'company_cost_amount',
      title: companyCostAmount,
      overline: 'Company Actual Cost',
    },
  ]
  const commonItems = [
    {
      key: 'retail_price_amount',
      title: retailPriceAmount,
      overline: 'Retail Price',
    },
    {
      key: 'salesperson_cost_amount',
      title: salespersonCostAmount,
      overline: 'Salesperson Cost',
    },
  ]
  const items = isAdmin ? commonItems.concat(adminItems) : commonItems

  return <StatStack items={items} />
}

// Common product fields
export const productFields = {
  brand_id: {
    key: 'brand_id',
    name: 'brand_id',
    type: 'model',
    module: brandModule,
    required: true,
    select:
      '*, currency_factor(title, buy_rate, sell_rate), company:company_id(id, title)',
    renderOption: ({ option, pk }) => {
      // TODO@Joel: Allow search via brand.title && company.title
      return (
        <div>
          <b>{option[pk]}</b> - {option?.company?.title}
        </div>
      )
    },
  },
  category_id: {
    key: 'category_id',
    name: 'category_id',
    type: 'model',
    module: categoryModule,
  },
}

export const productFormSections: FormSectionProps[] = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up product details',
    icon: <BallotOutlinedIcon />,
    fields: [
      { key: 'avatar_src', name: 'avatar_src', type: 'image' },
      { key: 'model_code', name: 'model_code', type: 'input', required: true },
      productFields.brand_id,
      {
        key: 'title',
        name: 'title',
        type: 'input',
        required: true,
        label: 'Product Description',
      },
      productFields.category_id,
      {
        key: 'warehouse_ids',
        name: 'warehouse_ids',
        label: 'Warehouses',
        type: 'model',
        module: warehouseModule,
        multiple: true,
      },
    ],
  },
  {
    key: 'pricing',
    title: 'Pricing',
    subtitle: 'Enter product profit, margin, cost, and other pricing details',
    icon: <MonetizationOnOutlinedIcon />,
    fields: [
      <ProductPrices />,
      {
        key: 'supplier_cost_amount',
        name: 'supplier_cost_amount',
        type: 'amount',
      },
    ],
  },
  {
    key: 'catalog',
    title: 'Catalog',
    subtitle: 'Fill up catalog details',
    icon: <BallotOutlinedIcon />,
    fields: [
      { key: 'subtitle', name: 'subtitle', type: 'input' },
      [
        { key: 'serial_number', name: 'serial_number', type: 'input' },
        { key: 'model_sub_code', name: 'model_sub_code', type: 'input' },
      ],

      [
        { key: 'sku', name: 'sku', type: 'input' },
        { key: 'barcode', name: 'barcode', type: 'input' },
        { key: 'hscode', name: 'hscode', type: 'input' },
      ],

      [
        { key: 'country_of_supply', name: 'country_of_supply', type: 'input' },
        {
          key: 'country_of_manufacture',
          name: 'country_of_manufacture',
          type: 'input',
        },
        { key: 'country_of_origin', name: 'country_of_origin', type: 'input' },
      ],

      { key: 'expiry_date', name: 'expiry_date', type: 'input' },
      { key: 'description', name: 'description', type: 'html' },
    ],
  },
  {
    key: 'lifestyle-product-photos',
    title: 'Lifestyle Product Photos',
    subtitle: 'Manage lifestyle product photos',
    icon: <BallotOutlinedIcon />,
    fields: [
      {
        key: 'gallery_images',
        name: 'gallery_images',
        label: 'Lifestyle Product Photos',
        type: 'images',
        module: productGalleryImageModule,
      },
    ],
  },
  {
    key: 'printed-pdf-photos',
    title: 'Printed PDF Photos',
    subtitle: 'Manage PDF photos',
    icon: <BallotOutlinedIcon />,
    fields: [
      {
        key: 'spec_images',
        name: 'spec_images',
        label: 'Printed PDF Photos',
        type: 'images',
        module: productSpecImageModule,
      },
    ],
  },
  {
    key: 'attributes',
    title: 'Attributes',
    subtitle: 'Fill up product attributes',
    icon: <BallotOutlinedIcon />,
    fields: [
      [
        { key: 'width_mm', name: 'width_mm', type: 'input' },
        { key: 'height_mm', name: 'height_mm', type: 'input' },
        { key: 'depth_mm', name: 'depth_mm', type: 'input' },
        { key: 'weight_g', name: 'weight_g', type: 'input' },
      ],

      { key: 'color', name: 'color', type: 'input' },
    ],
  },
  {
    key: 'commission',
    title: 'Commission',
    subtitle: 'Enter commission details',
    icon: <MonetizationOnOutlinedIcon />,
    fields: [
      {
        key: 'is-itemized-commission',
        name: 'is_itemized_commission',
        type: 'switch',
      },
    ],
  },
  {
    key: 'attach-dimensions',
    title: 'Attachment Dimensions',
    subtitle: 'Manage product dimension attachments',
    icon: <BallotOutlinedIcon />,
    fields: [
      {
        key: 'spec_files',
        name: 'spec_files',
        label: 'Product Dimension Attachments',
        type: 'files',
        module: productSpecFileModule,
      },
    ],
  },
]

export const productPreviewFormSections = productFormSections
export const productAddFormSections = productFormSections

// ==============================
// Column Defs
// ==============================
export const productColumnDefs = [
  {
    field: 'model_code',
    headerName: 'Model',
    valueGetter: ({ data }) => `${data.brand.code}${data.model_code}`,
    hasAvatar: true,
    minWidth: 250,
  },
  {
    field: 'title',
    headerName: 'Description',
    module: productModule,
    previewFormSections: productPreviewFormSections,
    minWidth: 350,
  },
  {
    field: 'brand.title',
    headerName: 'Brand',
    module: brandModule,
    previewFormSections: brandPreviewFormSections,
  },
  {
    field: 'brand.company.title',
    headerName: 'Company',
    module: companyModule,
    previewFormSections: companyPreviewFormSections,
    minWidth: 250,
  },
  { field: 'category.title', headerName: 'Category' },
  {
    field: 'supplier_cost_amount',
    headerName: 'Supplier Cost',
    minWidth: 110,
    valueFormatter: ({ value }) => printAmount(value),
  },
  {
    field: 'retail_price_amount',
    headerName: 'Retail Price',
    minWidth: 110,
    valueGetter: ({ data }) =>
      getRetailPriceAmount({ ...data, ...data?.brand }),
    valueFormatter: ({ value }) => printAmount(value),
  },
  {
    field: 'salesperson_cost_amount',
    headerName: 'Salesperson Cost',
    minWidth: 135,
    valueGetter: ({ data }) =>
      getSalespersonCostAmount({ ...data, ...data?.brand }),
    valueFormatter: ({ value }) => printAmount(value),
  },
  {
    field: 'company_cost_amount',
    headerName: 'Company Cost',
    minWidth: 130,
    valueGetter: ({ data }) =>
      getCompanyCostAmount({ ...data, ...data?.brand }),
    valueFormatter: ({ value, data }) =>
      printAmount(value, { currency: data.brand.currency_factor?.title }),
    hide: ({ user }) => user?.role?.title !== 'Admin',
  },
  {
    field: 'actions',
    renderMoreItems: ({ data }) => {
      return [
        {
          key: 'duplicate',
          value: 'duplicate',
          label: 'Duplicate',
          icon: <ContentCopyOutlinedIcon fontSize="small" />,
        },
      ]
    },
  },
]

export const productSearchFormSections = [
  {
    key: 'general',
    fields: [{ key: 'title', name: 'title', type: 'input', op: 'ilike' }],
  },
]

export const productFilterFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up details',
    icon: <BallotOutlinedIcon />,
    fields: [
      [
        {
          key: 'min_supplier_cost_amount',
          name: 'min_supplier_cost_amount',
          label: 'Min Supplier Cost',
          type: 'amount',
          filterKey: 'supplier_cost_amount',
          op: 'gte',
        },
        {
          key: 'max_supplier_cost_amount',
          name: 'max_supplier_cost_amount',
          label: 'Max Supplier Cost',
          type: 'amount',
          filterKey: 'supplier_cost_amount',
          op: 'lte',
        },
      ],
      productFields.brand_id,
      productFields.category_id,
    ],
  },
]
