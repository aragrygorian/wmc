import { commonConfig } from '@common/config'

export const appConfig = {
  ...commonConfig,
  title: 'POS',
  absoluteUrl: process.env.NEXT_PUBLIC_APP_ABSOLUTE_URL || '#',
  theme: {
    ...commonConfig.theme,
    palette: {
      ...commonConfig.theme.palette,
      primary: {
        light: '#ebf6fa',
        main: '#42a0cf',
        dark: '#1b4b63',
        contrastText: '#fff',
      },
      success: {
        light: '#edf7ed',
        main: '#4caf50',
      },
    },
  },
}
