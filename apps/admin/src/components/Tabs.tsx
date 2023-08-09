import React, { useState } from 'react'
import {
  Tab as MuiTab,
  TabProps as MuiTabProps,
  Tabs as MuiTabs,
  TabsProps as MuiTabsProps,
} from '@mui/material'

interface Tab {
  title: string
  children?: React.ReactNode
  props?: Partial<MuiTabProps>
}

interface TabsProps extends MuiTabsProps {
  tabs: Array<Tab>
}

const Tabs: React.FC<TabsProps> = (props) => {
  const { tabs, ...rest } = props
  const [tabValue, setTabValue] = useState<number>(0)
  return (
    <>
      <MuiTabs
        value={tabValue}
        onChange={(_, value) => setTabValue(value)}
        {...rest}
      >
        {tabs.map(({ title, props }) => (
          <MuiTab key={title} label={title} {...props} />
        ))}
      </MuiTabs>
      {tabs.map(
        ({ title, children }, index) =>
          index === tabValue && (
            <React.Fragment key={title}>{children}</React.Fragment>
          )
      )}
    </>
  )
}

export default Tabs
