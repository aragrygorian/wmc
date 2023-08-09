import React from 'react'
import { Stack, Typography } from '@gravis-os/ui'
import { useWatch } from 'react-hook-form'
import dayjs from 'dayjs'

// TODO: Add types
const PublishedAtDisplayField = (props) => {
  const { formContext, overline } = props
  const { control } = formContext || {}
  const [published_at] = useWatch({ control, name: ['published_at'] })
  const publishedAt = dayjs(published_at)
  return (
    <Stack spacing={1}>
      <Typography variant="overline" color="text.secondary">
        {overline}
      </Typography>
      <Typography variant="h3">{publishedAt.format('DD MMM YYYY')}</Typography>
    </Stack>
  )
}

export default PublishedAtDisplayField
