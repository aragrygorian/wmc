import React from 'react'
import { LoginForm } from '@gravis-os/auth'
import { routes } from '@pos/app/routes'
import { appConfig } from '@pos/app/config'
import { Typography } from '@gravis-os/ui'
import AuthLayout from '@pos/layouts/AuthLayout'

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  return (
    <AuthLayout title={`${appConfig.title} Login`}>
      <>
        <Typography variant="overline" color="primary.main" sx={{ mb: 2 }}>
          {appConfig.title} Dashboard
        </Typography>

        <LoginForm />
      </>
    </AuthLayout>
  )
}

export default LoginPage
