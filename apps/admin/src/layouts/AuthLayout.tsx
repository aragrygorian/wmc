import React from 'react'
import Head from 'next/head'
import { Box, Card, Container, Divider } from '@mui/material'
import { Button, Stack } from '@gravis-os/ui'
import NextLink from 'next/link'
import { commonConfig } from '@common/config'
import { routes } from '@admin/app/routes'

export interface AuthLayoutProps {
  actions?: React.ReactElement
  children?: React.ReactElement
  disableResetPasswordButton?: boolean
  title: string
}

const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
  const { actions, children, disableResetPasswordButton, title } = props

  return (
    <>
      <Head>
        <title>
          {title} | {commonConfig.title}
        </title>
      </Head>

      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: '60px',
              md: '120px',
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              {children}
            </Box>
            <Divider sx={{ my: 3 }} />

            <Stack direction="row" alignItems="center" spacing={1}>
              {!disableResetPasswordButton && (
                <Button href={routes.RESET_PASSWORD}>Reset Password</Button>
              )}
              {actions}
            </Stack>
          </Card>
        </Container>
      </Box>
    </>
  )
}

export default AuthLayout
