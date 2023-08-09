import React from 'react'
import { CrudForm, CrudFormLayout, CrudTable } from '@gravis-os/crud'
import { isEqual } from 'lodash'
import { quotationModule } from '@admin/modules/Quotation/quotationModule'
import { companyFormSections, companyModule } from './companyConfig'
import {
  brandAddFormSections,
  brandColumnDefs,
  brandModule,
  brandPreviewFormSections,
} from '../Brand/brandConfig'
import {
  productAddFormSections,
  productColumnDefs,
  productPreviewFormSections,
} from '../Product/productConfig'
import productModule from '../Product/productModule'
import {
  contactAddFormSections,
  contactColumnDefs,
  contactModule,
  contactPreviewFormSections,
} from '../Contact'
import {
  quotationAddFormSections,
  quotationColumnDefs,
  quotationPreviewFormSections,
} from '../Quotation/quotationConfig'
import {
  invoiceAddFormSections,
  invoiceColumnDefs,
  invoicePreviewFormSections,
} from '../Invoice/invoiceConfig'
import invoiceModule from '../Invoice/invoiceModule'
import {
  supplierInvoiceAddFormSections,
  supplierInvoiceColumnDefs,
  supplierInvoiceModule,
  supplierInvoicePreviewFormSections,
} from '../SupplierInvoice/supplierInvoiceConfig'
import { CompanyType } from './constants'
import {
  companyBrandAddFormSections,
  companyBrandColumnDefs,
  companyBrandModule,
  companyBrandPreviewFormSections,
} from './companyBrandConfig'

export const companyTabs = [
  {
    key: 'general',
    value: 'general',
    label: 'General',
    children: (
      <CrudForm
        module={companyModule}
        sections={companyFormSections}
        disableHeader
      >
        {({ formJsx, formControlJsx }) => (
          <CrudFormLayout rightAside={formControlJsx}>{formJsx}</CrudFormLayout>
        )}
      </CrudForm>
    ),
  },
  {
    key: 'contacts',
    value: 'contacts',
    label: 'Contacts',
    render: ({ item }) => {
      return (
        <CrudTable
          module={contactModule}
          columnDefs={contactColumnDefs}
          setQuery={(q) => q.eq('company_id', item.id)}
          previewFormSections={contactPreviewFormSections}
          previewFormProps={{ disabledFields: ['company_id'] }}
          addFormSections={contactAddFormSections}
          addFormProps={{
            disabledFields: ['company_id'],
            defaultValues: { company_id: item.id },
          }}
        />
      )
    },
  },
  {
    key: 'brands',
    value: 'brands',
    label: 'Brands',
    hidden: ({ item }) => isEqual(item?.type, CompanyType.Customer),
    render: ({ item }) => (
      <CrudTable
        module={brandModule}
        columnDefs={brandColumnDefs}
        setQuery={(q) => q.eq('company_id', item.id)}
        previewFormSections={brandPreviewFormSections}
        previewFormProps={{ disabledFields: ['company_id'] }}
        addFormSections={brandAddFormSections}
        addFormProps={{
          disabledFields: ['company_id'],
          defaultValues: { company_id: item.id },
        }}
      />
    ),
  },
  {
    key: 'products',
    value: 'products',
    label: 'Products',
    hidden: ({ item }) => isEqual(item?.type, CompanyType.Customer),
    render: ({ item }) => (
      <CrudTable
        module={productModule}
        columnDefs={productColumnDefs}
        setQuery={(q) => q.eq('brand.company_id', item.id)}
        previewFormSections={productPreviewFormSections}
        addFormSections={productAddFormSections}
        addFormProps={{
          disabledFields: ['company_id'],
          defaultValues: { company_id: item.id },
        }}
      />
    ),
  },
  {
    key: 'quotations',
    value: 'quotations',
    label: 'Quotations',
    render: ({ item }) => (
      <CrudTable
        module={quotationModule}
        columnDefs={quotationColumnDefs}
        setQuery={(q) => q.eq('company_id', item.id)}
        previewFormSections={quotationPreviewFormSections}
        addFormSections={quotationAddFormSections}
        addFormProps={{
          disabledFields: ['company_id'],
          defaultValues: { company_id: item.id },
        }}
      />
    ),
  },
  {
    key: 'supplier_invoices',
    value: 'supplier_invoices',
    label: 'Supplier Invoices',
    hidden: ({ item }) => isEqual(item?.type, CompanyType.Customer),
    render: ({ item }) => (
      <CrudTable
        module={supplierInvoiceModule}
        columnDefs={supplierInvoiceColumnDefs}
        setQuery={(q) => q.eq('company_id', item.id)}
        previewFormSections={supplierInvoicePreviewFormSections}
        addFormSections={supplierInvoiceAddFormSections}
        addFormProps={{
          disabledFields: ['company_id'],
          defaultValues: { company_id: item.id },
        }}
      />
    ),
  },
  {
    key: 'invoices',
    value: 'invoices',
    label: 'Invoices',
    // Hide tab if the company type is supplier
    hidden: ({ item }) => isEqual(item?.type, CompanyType.Supplier),
    render: ({ item }) => {
      return (
        <CrudTable
          module={invoiceModule}
          columnDefs={invoiceColumnDefs}
          setQuery={(q) => q.eq('company_id', item.id)}
          previewFormSections={invoicePreviewFormSections}
          addFormSections={invoiceAddFormSections}
          addFormProps={{
            disabledFields: ['company_id'],
            defaultValues: { company_id: item.id },
          }}
        />
      )
    },
  },
  {
    key: 'company_files',
    value: 'company_files',
    label: 'Company Files',
    render: ({ item }) => (
      <CrudTable
        module={invoiceModule}
        columnDefs={invoiceColumnDefs}
        setQuery={(q) => q.eq('company_id', item.id)}
        previewFormSections={invoicePreviewFormSections}
        addFormSections={invoiceAddFormSections}
        addFormProps={{
          disabledFields: ['company_id'],
          defaultValues: { company_id: item.id },
        }}
      />
    ),
  },
  {
    key: 'company_brands',
    value: 'company_brands',
    label: 'Brand Discounts',
    hidden: ({ item }) => !isEqual(item?.type, CompanyType.Customer),
    render: ({ item }) => (
      <CrudTable
        module={companyBrandModule}
        columnDefs={companyBrandColumnDefs}
        setQuery={(q) => q.eq('company_id', item.id)}
        previewFormSections={companyBrandPreviewFormSections}
        addFormSections={companyBrandAddFormSections}
        addFormProps={{
          disabledFields: ['company_id'],
          defaultValues: { company_id: item.id },
        }}
        disableManage
      />
    ),
  },
]
