import React from 'react'
import { Box, Card, Skeleton, Stack, Typography } from '@gravis-os/ui'

export interface HomeChartCardProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  actions?: React.ReactElement
}

export const HomeChartCard: React.FC<HomeChartCardProps> = (props) => {
  const { title, subtitle, actions } = props
  return (
    <Card>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Box>
          {title && <Typography variant="h4">{title}</Typography>}
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box>{actions}</Box>
      </Stack>

      <Skeleton
        animation={false}
        variant="rectangular"
        height={300}
        sx={{ mt: 2 }}
      />
    </Card>
  )
}
