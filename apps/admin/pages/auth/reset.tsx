import React from 'react'
import { Button } from '@gravis-os/ui'
import { ResetPasswordForm } from '@gravis-os/auth'
import { routes } from '@admin/app/routes'
import AuthLayout from '../../src/layouts/AuthLayout'

export interface ResetPageProps {}

const ResetPage: React.FC<ResetPageProps> = (props) => {
  return (
    <AuthLayout
      actions={<Button href={routes.LOGIN}>Back to Login</Button>}
      title="Reset Password"
      disableResetPasswordButton
    >
      <ResetPasswordForm
        authOptions={{
          redirectTo:
            process.env.NEXT_PUBLIC_APP_ABSOLUTE_URL + routes.RECOVER_PASSWORD,
        }}
      />
    </AuthLayout>
  )
}

export default ResetPage
