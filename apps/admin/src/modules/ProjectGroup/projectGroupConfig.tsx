import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import { routes } from '@admin/app/routes'
import { createGeneralFilterFormSection } from '../../utils/configHelpers'

export const projectGroupFields = {
  title: { key: 'title', name: 'title', type: 'input', required: true },
  subtitle: { key: 'subtitle', name: 'subtitle', type: 'input' },
}

export const projectGroupFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up general details',
    icon: <BallotOutlinedIcon />,
    fields: Object.values(projectGroupFields),
  },
]

export const projectGroupModule = {
  Icon: BallotOutlinedIcon,
  sk: 'slug',
  table: {
    name: 'project_group',
  },
  name: {
    singular: 'Project Group',
    plural: 'Project Groups',
  },
  route: {
    plural: routes.PROJECT_GROUPS,
  },
}

export const projectGroupFilterFormSections = [
  createGeneralFilterFormSection([
    {
      ...projectGroupFields.subtitle,
      op: 'ilike',
    },
  ]),
]

export const projectGroupPreviewFormSections = projectGroupFormSections

export const projectGroupColumnDefs = [
  { field: 'title' },
  { field: 'subtitle' },
]
