import React from 'react'
import { RecoverPasswordForm } from '@gravis-os/auth'
import { routes } from '@warehouse/app/routes'
import AuthLayout from '../../src/layouts/AuthLayout'

export interface RecoverPageProps {}

const RecoverPage: React.FC<RecoverPageProps> = (props) => {
  return (
    <AuthLayout title="Recover Password" disableResetPasswordButton>
      <RecoverPasswordForm
        redirectTo={
          process.env.NEXT_PUBLIC_APP_ABSOLUTE_URL +
          routes.AUTH_SUCCESS_REDIRECT
        }
      />
    </AuthLayout>
  )
}

export default RecoverPage
