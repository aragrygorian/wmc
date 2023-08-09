import {
  DashboardLayout as GvsDashboardLayout,
  DashboardLayoutProps as GvsDashboardLayoutProps,
} from '@gravis-os/dashboard'
import navConfig from '@pos/app/navConfig'
import Image from 'next/image'
import React from 'react'
import DashboardLayoutAccountPopover from './DashboardLayoutAccountPopover'

export interface DashboardLayoutProps extends GvsDashboardLayoutProps {}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const { headerProps, ...rest } = props
  return (
    <GvsDashboardLayout
      headerProps={{
        sx: {
          backgroundColor: 'background.paper',
          color: 'primary.main',
        },
        color: 'secondary',
        navItems: {
          left: [
            {
              key: 'logo',
              title: 'Logo',
              children: (
                <Image src="/static/pos_logo.png" width={83} height={18} />
              ),
              sx: { mr: 1 },
              showOnMobileBar: true,
            },
          ],
          right: [
            {
              key: 'account',
              title: 'Account',
              children: <DashboardLayoutAccountPopover />,
              showOnMobileBar: true,
            },
          ],
        },
        ...headerProps,
      }}
      leftAsideListItems={navConfig}
      leftAsideWidth={240}
      defaultLeftAsideOpen={false}
      disablePadding
      {...rest}
    />
  )
}

export default DashboardLayout
