import { userModule } from '@admin/modules/User/userConfig'
import type { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { AuthProvider } from '@gravis-os/auth'
import { CrudProvider } from '@gravis-os/crud'
import { deviasTheme } from '@gravis-os/dashboard'
import { SettingsConsumer, SettingsProvider } from '@gravis-os/ui'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { appConfig } from '@salesperson/app/config'
import { routes } from '@salesperson/app/routes'
import { createEmotionCache } from '@salesperson/lib/Mui/create-emotion-cache'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import type { FC } from 'react'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// CSS
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'react-quill/dist/quill.snow.css'

type EnhancedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

// Emotion
const clientSideEmotionCache = createEmotionCache()

// React query
const queryClient = new QueryClient()

const App: FC<EnhancedAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <QueryClientProvider client={queryClient}>
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
                  {() => (
                    <ThemeProvider
                      theme={createTheme(deviasTheme.light, appConfig.theme)}
                    >
                      <CssBaseline />
                      <Component {...pageProps} />
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
    </QueryClientProvider>
  )
}

export default App
