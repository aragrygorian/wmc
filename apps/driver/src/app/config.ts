import { commonConfig } from '@common/config'

export const appConfig = {
  ...commonConfig,
  title: 'Workmetric Driver',
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
      // primary: {
      //   light: '#6fbf73',
      //   main: '#4caf50',
      //   dark: '#357a38',
      //   contrastText: '#fff',
      // },
      secondary: {
        light: '#51b7ae',
        main: '#26a69a',
        dark: '#1a746b',
        contrastText: '#fff',
      },
    },
  },
}
