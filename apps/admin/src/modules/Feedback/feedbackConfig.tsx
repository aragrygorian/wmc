import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import { routes } from '@admin/app/routes'
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined'

export const feedbackFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up general info',
    icon: <BallotOutlinedIcon />,
    fields: [
      { key: 'title', name: 'title', type: 'input', required: true },
      { key: 'description', name: 'description', type: 'input' },
    ],
  },
]

export const feedbackModule = {
  sk: 'slug',
  table: {
    name: 'feedback',
  },
  name: {
    singular: 'Feedback',
    plural: 'Feedback',
  },
  route: {
    plural: routes.FEEDBACKS,
  },
  Icon: FeedbackOutlinedIcon,
}

export const feedbackColumnDefs = [
  { field: 'title' },
  { field: 'description' },
  { field: 'status' },
  { field: 'created_at', headerName: 'Created At' },
]

export const feedbackPreviewFormSections = feedbackFormSections
