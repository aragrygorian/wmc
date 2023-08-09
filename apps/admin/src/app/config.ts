import { commonConfig } from '@common/config'

export const appConfig = {
  ...commonConfig,
  title: 'Workmetric Admin',
  absoluteUrl: process.env.NEXT_PUBLIC_APP_ABSOLUTE_URL || '#',
  styles: {
    headerHeight: 64,
    leftAsideWidth: 230,
    rightAsideWidth: 440,
  },
}
