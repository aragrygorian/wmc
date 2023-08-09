import { commonConfig } from '@common/config'

export const appConfig = {
  ...commonConfig,
  title: 'Workmetric Salesperson',
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
        light: '#e8effd',
        main: '#1e39e9',
        dark: '#1521a3',
        contrastText: '#fff',
      },
      secondary: {
        light: '#33aefa',
        main: '#0091f9',
        dark: '#0066ae',
        contrastText: '#fff',
      },
    },
  },
}
