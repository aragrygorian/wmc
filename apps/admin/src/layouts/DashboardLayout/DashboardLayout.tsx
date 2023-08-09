import React from 'react'
import { Link, ListItemProps, Typography } from '@gravis-os/ui'
import {
  DashboardLayout as GvsDashboardLayout,
  DashboardLayoutProps as GvsDashboardLayoutProps,
} from '@gravis-os/dashboard'
import { appConfig } from '@admin/app/config'
import { routes } from '@admin/app/routes'
import useNav from '@admin/hooks/useNav'
import DashboardLayoutAccountPopover from './DashboardLayoutAccountPopover'

export interface DashboardLayoutProps extends GvsDashboardLayoutProps {}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const { headerProps, ...rest } = props

  const { config } = useNav()

  return (
    <GvsDashboardLayout
      headerProps={{
        color: 'secondary',
        navItems: {
          left: [
            {
              key: 'logo',
              title: 'Logo',
              children: (
                <Link href={routes.HOME} color="inherit" underline="none">
                  <Typography variant="subtitle1" color="inherit">
                    {appConfig.title}
                  </Typography>
                </Link>
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
      leftAsideListItems={config as ListItemProps[]}
      leftAsideWidth={240}
      isMiniVariant
      {...rest}
    />
  )
}

export default DashboardLayout
