import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import { routes } from '@admin/app/routes'
import { projectGroupModule } from '../ProjectGroup/projectGroupConfig'
import { projectCategoryModule } from './projectCategoryConfig'
import { createGeneralFilterFormSection } from '../../utils/configHelpers'

export const projectFields = {
  title: { key: 'title', name: 'title', type: 'input', required: true },
  subtitle: { key: 'subtitle', name: 'subtitle', type: 'input' },
  description: { key: 'description', name: 'description', type: 'input' },
  project_group_id: {
    key: 'project_group_id',
    name: 'project_group_id',
    type: 'model',
    module: projectGroupModule,
  },
  project_category_id: {
    key: 'project_category_id',
    name: 'project_category_id',
    type: 'model',
    module: projectCategoryModule,
  },
}

export const projectFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up project details',
    icon: <BallotOutlinedIcon />,
    fields: Object.values(projectFields),
  },
]

export const projectModule = {
  sk: 'slug',
  table: {
    name: 'project',
  },
  name: {
    singular: 'Project',
    plural: 'Projects',
  },
  route: {
    plural: routes.PROJECTS,
  },
  select: {
    list: '*, project_group(title)',
    detail:
      '*, brand_ids:brand(*), project_category(id, title), project_group(id, title)',
  },
  Icon: LibraryBooksOutlinedIcon,
}

export const projectFilterFormSections = [
  createGeneralFilterFormSection([projectFields.project_group_id]),
]

export const projectPreviewFormSections = projectFormSections
export const projectAddFormSections = projectFormSections

export const projectColumnDefs = [
  { field: 'title', minWidth: 225 },
  { field: 'project_group.title', headerName: 'Project Group' },
]
