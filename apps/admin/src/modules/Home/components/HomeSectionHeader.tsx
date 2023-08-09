import { Box, Button, Stack, Typography } from '@gravis-os/ui'
import React from 'react'

const HomeSectionHeader = (props) => {
  const { title } = props
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography variant="h4">{title}</Typography>
      </Box>
      <Box>
        <Stack direction="row">
          <Button size="small">Day</Button>
          <Button size="small">Week</Button>
          <Button size="small">Month</Button>
          <Button size="small">Year</Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default HomeSectionHeader
