import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { kebabCase, lowerCase, map, startCase } from 'lodash'
import React from 'react'
import { routes } from './routes'

export interface NavConfigProps {
  key: string
  title: string
  href: string
  icon: React.ReactElement
}

const navConfig: NavConfigProps[] = map(
  [routes.HOME, routes.DELIVERY_ORDER],
  (route) => ({
    key: kebabCase(route),
    title: startCase(lowerCase(route)),
    href: route,
    icon: <LocalShippingIcon />,
  })
)

export default navConfig
