import React from 'react'
import { Stack, Typography } from '@gravis-os/ui'
import { useWatch } from 'react-hook-form'

// TODO: Add types
const TitleDisplayField = (props) => {
  const { formContext, overline } = props
  const { control } = formContext || {}
  const [title] = useWatch({ control, name: ['title'] })
  return (
    <Stack spacing={1}>
      <Typography variant="overline" color="text.secondary">
        {overline}
      </Typography>
      <Typography variant="h3">{title}</Typography>
    </Stack>
  )
}

export default TitleDisplayField
