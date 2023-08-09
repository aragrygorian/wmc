import React from 'react'
import {
  PosLayout as GvsPosLayout,
  PosLayoutProps as GvsPosLayoutProps,
} from '@gravis-os/apps/pos'
import useUser from '@pos/app/useUser'
import { appConfig } from '@pos/app/config'

export interface PosLayoutProps extends GvsPosLayoutProps {}

const PosLayout: React.FC<PosLayoutProps> = (props) => {
  const { user } = useUser()

  return (
    <GvsPosLayout
      navItemLeftTitle={appConfig.title}
      navItemCenterTitle={user?.full_name || ''}
      navItemRightTitle={appConfig.platformTitle}
      {...props}
    />
  )
}

export default PosLayout
