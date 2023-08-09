import React from 'react'
import type { FC } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { CrudProvider } from '@gravis-os/crud'
import { appConfig } from '@admin/app/config'
import { AuthProvider } from '@gravis-os/auth'
import { routes } from '@admin/app/routes'
import { SettingsConsumer, SettingsProvider } from '@gravis-os/ui'
import { deviasTheme } from '@gravis-os/dashboard'
import { createEmotionCache } from '../src/utils/create-emotion-cache'
import { userModule } from '../src/modules/User/userConfig'

// CSS
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'
import '@fullcalendar/timeline/main.css'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'react-quill/dist/quill.snow.css'

type EnhancedAppProps = AppProps<{ dehydratedState: DehydratedState }> & {
  Component: NextPage
  emotionCache: EmotionCache
}

// Emotion
const clientSideEmotionCache = createEmotionCache()

// React query
const queryClient = new QueryClient()

const App: FC<EnhancedAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const { dehydratedState, ...pagePropsRest } = pageProps

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <CacheProvider value={emotionCache}>
          <AuthProvider
            select={userModule.select.list}
            authRoutes={{
              authenticationSuccessRedirect: routes.AUTH_SUCCESS_REDIRECT,
              authorizationSuccessRedirect: routes.AUTH_SUCCESS_REDIRECT,
            }}
          >
            <CrudProvider>
              <Head>
                <title>{appConfig.title}</title>
                <meta
                  name="viewport"
                  content="initial-scale=1, width=device-width"
                />
              </Head>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <SettingsProvider>
                  <SettingsConsumer>
                    {({ settings }) => (
                      <ThemeProvider
                        theme={createTheme(
                          deviasTheme[settings.theme],
                          appConfig.theme
                        )}
                      >
                        <CssBaseline />
                        <Component {...pagePropsRest} />
                        <Toaster position="top-right" />
                      </ThemeProvider>
                    )}
                  </SettingsConsumer>
                </SettingsProvider>
              </LocalizationProvider>
            </CrudProvider>
          </AuthProvider>
        </CacheProvider>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
