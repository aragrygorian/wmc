import { commonConfig } from '@common/config'

export const appConfig = {
  ...commonConfig,
  title: 'Workmetric Warehouse',
  absoluteUrl: process.env.NEXT_PUBLIC_APP_ABSOLUTE_URL || '#',
  styles: {
    headerHeight: 64,
    leftAsideWidth: 230,
    rightAsideWidth: 440,
  },
  theme: {
    ...commonConfig.theme,
    palette: {
      ...commonConfig.theme.palette,
      primary: {
        light: '#fde8ef',
        main: '#e91e63',
        dark: '#a31545',
        contrastText: '#fff',
      },
      secondary: {
        light: '#dd33fa',
        main: '#d500f9',
        dark: '#9500ae',
        contrastText: '#fff',
      },
    },
  },
}
