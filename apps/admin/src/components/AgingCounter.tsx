import React from 'react'
import { Avatar, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'

export interface AgingCounterProps {
  value: string | Date
}

const AgingCounter: React.FC<AgingCounterProps> = ({ value }) => {
  const days = dayjs().diff(dayjs(value), 'days')
  return (
    <Stack alignItems="center">
      <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.dark' }}>
        {days}
      </Avatar>
      <Typography variant="overline">Days</Typography>
    </Stack>
  )
}

export default AgingCounter
