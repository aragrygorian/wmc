import React from 'react'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import { routes } from '@admin/app/routes'
import { createGeneralFilterFormSection } from '../../utils/configHelpers'

export const categoryFields = {
  title: { key: 'title', name: 'title', type: 'input', required: true },
  subtitle: { key: 'subtitle', name: 'subtitle', type: 'input' },
}

export const categoryFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up category details',
    icon: <BallotOutlinedIcon />,
    fields: Object.values(categoryFields),
  },
]

export const categoryModule = {
  sk: 'slug',
  table: {
    name: 'category',
  },
  name: {
    singular: 'Category',
    plural: 'Categories',
  },
  route: {
    plural: routes.CATEGORYS,
  },
  Icon: CategoryOutlinedIcon,
}

export const categoryFilterFormSections = [
  createGeneralFilterFormSection([{ ...categoryFields.subtitle, op: 'ilike' }]),
]

export const categoryPreviewFormSections = categoryFormSections

export const categoryColumnDefs = [{ field: 'title' }, { field: 'subtitle' }]
