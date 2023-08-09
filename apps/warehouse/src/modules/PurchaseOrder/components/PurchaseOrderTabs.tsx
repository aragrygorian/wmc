import { Box, InfoCard, InfoCardProps, Stack, Typography } from '@gravis-os/ui'
import { Tab, Tabs } from '@mui/material'
import { isEqual, kebabCase, map } from 'lodash'
import React, { SyntheticEvent, useState } from 'react'

export const enum PurchaseOrderTabLabel {
  Pending = 'Pending',
  GoodsReceived = 'Goods Received',
}

export interface PurchaseOrderTabsItemProps {
  items: InfoCardProps[]
  index: number
}

export interface PurchaseOrderTabsProps {
  tabs: PurchaseOrderTabsItemProps[]
}

const PurchaseOrderTabs: React.FC<PurchaseOrderTabsProps> = (
  props
): React.ReactElement => {
  const { tabs } = props

  /* Tabs Value */
  const [currentTabValue, setCurrentTabValue] = useState(0)
  const handleTabChange = (_e: SyntheticEvent, nextValue: number) => {
    setCurrentTabValue(nextValue)
  }

  return (
    <Box>
      {/* Tab Header */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Tabs
          value={currentTabValue}
          onChange={handleTabChange}
          variant="scrollable"
        >
          {map(
            [
              PurchaseOrderTabLabel.Pending,
              PurchaseOrderTabLabel.GoodsReceived,
            ],
            (label) => (
              <Tab
                key={`${kebabCase(label)}-tab-header`}
                label={<Typography variant="overline">{label}</Typography>}
                sx={{ px: { xs: 3, md: 4, lg: 5 }, textAlign: 'center' }}
              />
            )
          )}
        </Tabs>
      </Box>

      {/* Content */}
      <Stack spacing={1} mt={2}>
        {map(tabs, (tab) => {
          const { items, index } = tab
          return (
            isEqual(currentTabValue, index) && (
              <Stack spacing={1} key={`info-card-stack-${index}`}>
                {map(items, (item) => (
                  <InfoCard {...item} />
                ))}
              </Stack>
            )
          )
        })}
      </Stack>
    </Box>
  )
}

export default PurchaseOrderTabs
