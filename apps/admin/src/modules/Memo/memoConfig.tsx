import React from 'react'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'

export const memoFormSections = [
  {
    key: 'general',
    title: 'General',
    subtitle: 'Fill up general details',
    icon: <BallotOutlinedIcon />,
    fields: [
      { key: 'title', name: 'title', type: 'input', required: true },
      { key: 'subtitle', name: 'subtitle', type: 'input' },
    ],
  },
]

export const memoPreviewFormSections = memoFormSections

export const memoColumnDefs = [{ field: 'title' }, { field: 'subtitle' }]
