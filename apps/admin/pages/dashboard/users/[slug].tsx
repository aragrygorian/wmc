import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { CrudForm, CrudFormLayout, DetailPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import { userFormSections, userModule } from '@admin/modules/User/userConfig'
import { useRouter } from 'next/router'
import { userTabs } from '@admin/modules/User/userTabs'
import { Box } from '@gravis-os/ui'
import useCreateUpdateUser from '@admin/modules/User/useCreateUpdateUser'
import { handleSignUp } from '@gravis-os/auth'
import { routes } from '@admin/app/routes'

const UserDetailPage: NextPage = () => {
  const router = useRouter()
  const useUpdateUser = useCreateUpdateUser()

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: User Detail</title>
      </Head>

      <DetailPage
        module={userModule}
        tabs={[
          {
            key: 'general',
            value: 'general',
            label: 'General',
            render: (renderProps) => {
              return (
                <Box sx={{ mt: 2 }}>
                  <CrudForm
                    {...renderProps}
                    module={userModule}
                    sections={userFormSections}
                    disableHeader
                    useCrudFormProps={{
                      onSubmit: async (props) => {
                        const { values } = props

                        /* eslint-disable camelcase */
                        const {
                          email,
                          password,
                          first_name,
                          last_name,
                          ...rest
                        } = values

                        const { id } = await handleSignUp(
                          { email, password },
                          {
                            redirectTo:
                              process.env.NEXT_PUBLIC_APP_ABSOLUTE_URL +
                              routes.AUTH_SUCCESS_REDIRECT,
                          }
                        )

                        await useUpdateUser.mutateAsync({
                          ...rest,
                          id,
                          email,
                          first_name,
                          last_name,
                          title: email,
                          slug: email,
                          full_name: [first_name, last_name]
                            .filter(Boolean)
                            .join(' '),
                        })

                        const url = `${userModule.route.plural}/${email}`

                        router.push(url, url, { shallow: true })
                      },
                    }}
                  >
                    {({ formJsx, formControlJsx }) => (
                      <CrudFormLayout rightAside={formControlJsx}>
                        {formJsx}
                      </CrudFormLayout>
                    )}
                  </CrudForm>
                </Box>
              )
            },
          },
          ...userTabs,
        ]}
      />
    </DashboardLayout>
  )
}

export default UserDetailPage
