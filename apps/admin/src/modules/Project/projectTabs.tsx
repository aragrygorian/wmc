import React from 'react'
import { CrudForm, CrudFormLayout, CrudTable } from '@gravis-os/crud'
import { quotationModule } from '@admin/modules/Quotation/quotationModule'
import { projectFormSections, projectModule } from './projectConfig'
import {
  projectBrandAddFormSections,
  projectBrandColumnDefs,
  projectBrandModule,
  projectBrandPreviewFormSections,
} from './projectBrandConfig'
import {
  getProjectProductAddFormSections,
  projectProductColumnDefs,
  projectProductModule,
  getProjectProductPreviewFormSections,
} from './projectProductConfig'
import {
  projectCurrencyFactorAddFormSections,
  projectCurrencyFactorColumnDefs,
  projectCurrencyFactorModule,
  projectCurrencyFactorPreviewFormSections,
} from './projectCurrencyFactorConfig'
import {
  quotationAddFormSections,
  quotationColumnDefs,
  quotationFormSections,
} from '../Quotation/quotationConfig'

export const projectTabs = [
  {
    key: 'general',
    value: 'general',
    label: 'General',
    children: (
      <CrudForm
        module={projectModule}
        sections={projectFormSections}
        disableHeader
      >
        {({ formJsx, formControlJsx }) => (
          <CrudFormLayout rightAside={formControlJsx}>{formJsx}</CrudFormLayout>
        )}
      </CrudForm>
    ),
  },
  {
    key: 'brands',
    value: 'brands',
    label: 'Brand Discounts',
    render: ({ item }) => {
      return (
        <CrudTable
          module={projectBrandModule}
          columnDefs={projectBrandColumnDefs}
          setQuery={(q) => q.eq('project_id', item.id)}
          previewFormSections={projectBrandPreviewFormSections}
          previewFormProps={{ disabledFields: ['project_id'] }}
          addFormSections={projectBrandAddFormSections}
          addFormProps={{
            disabledFields: ['project_id'],
            defaultValues: { project_id: item.id },
          }}
          disableManage
        />
      )
    },
  },
  {
    key: 'products',
    value: 'products',
    label: 'Product Discounts',
    render: ({ item }) => {
      return (
        <CrudTable
          module={projectProductModule}
          columnDefs={projectProductColumnDefs}
          setQuery={(q) => q.eq('project_id', item.id)}
          previewFormSections={getProjectProductPreviewFormSections({
            projectId: item.id,
          })}
          previewFormProps={{ disabledFields: ['project_id'] }}
          addFormSections={getProjectProductAddFormSections({
            projectId: item.id,
          })}
          addFormProps={{
            disabledFields: ['project_id'],
            defaultValues: { project_id: item.id },
          }}
          disableManage
        />
      )
    },
  },
  {
    key: 'project_currency',
    value: 'project_currency',
    label: 'Project Currencies',
    render: ({ item }) => {
      return (
        <CrudTable
          module={projectCurrencyFactorModule}
          columnDefs={projectCurrencyFactorColumnDefs}
          setQuery={(q) => q.eq('project_id', item.id)}
          previewFormSections={projectCurrencyFactorPreviewFormSections}
          previewFormProps={{
            disabledFields: ['project_id'],
            defaultIsReadOnly: false,
          }}
          addFormSections={projectCurrencyFactorAddFormSections}
          addFormProps={{
            disabledFields: ['project_id'],
            defaultValues: { project_id: item.id },
          }}
          disableManage
        />
      )
    },
  },
  {
    key: 'quotation',
    value: 'quotation',
    label: 'Quotations',
    render: ({ item }) => {
      return (
        <CrudTable
          module={quotationModule}
          columnDefs={quotationColumnDefs.filter(
            ({ field }) => field !== 'project.title'
          )}
          setQuery={(q) => q.eq('project_id', item.id)}
          previewFormSections={quotationFormSections}
          previewFormProps={{ disabledFields: ['project_id'] }}
          addFormSections={quotationAddFormSections}
          addFormProps={{
            disabledFields: ['project_id'],
            defaultValues: { project_id: item.id },
          }}
        />
      )
    },
  },
]
