import React from 'react'
import { RegisterForm } from '@gravis-os/auth'
import { routes } from '@admin/app/routes'
import AuthLayout from '../../src/layouts/AuthLayout'

export interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = (props) => {
  return (
    <AuthLayout title="Register">
      <RegisterForm
        authOptions={{
          redirectTo:
            process.env.NEXT_PUBLIC_APP_ABSOLUTE_URL +
            routes.AUTH_SUCCESS_REDIRECT,
        }}
        submitOptions={{
          toastSuccessMessage:
            'Sign up successful, please verify your account by clicking on the link sent your email.',
        }}
      />
    </AuthLayout>
  )
}

export default RegisterPage
