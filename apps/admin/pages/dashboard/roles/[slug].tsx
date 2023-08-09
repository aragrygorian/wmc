import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { DetailPage } from '@gravis-os/crud'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import { roleModule, useRoleFormSections } from '@admin/modules/Role/roleConfig'
import useUser from '@admin/app/useUser'
import { Role } from '@admin/modules/Role/types'
import { differenceBy } from 'lodash'

const RoleDetailPage: NextPage = () => {
  const { user } = useUser()

  const formSections = useRoleFormSections() || []

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Role Detail</title>
      </Head>

      <DetailPage
        module={roleModule}
        formSections={formSections}
        crudFormProps={{
          useCrudFormProps: {
            setFormValues: ({ item, values, isNew }) => {
              const assignedPermissions = (item as Role)?.permissions || []
              const permissions = (values as Role)?.permissions || []

              const nextPermissions = differenceBy(
                permissions,
                assignedPermissions,
                'id'
              )

              return {
                ...values,
                created_by: isNew ? user?.id : values?.created_by,
                updated_by: user?.id,
                permissions: nextPermissions?.map((permission) => ({
                  role_id: values?.id,
                  permission_id: permission?.id,
                  created_by: user?.id,
                  updated_by: user?.id,
                })),
              }
            },
          },
        }}
      />
    </DashboardLayout>
  )
}

export default RoleDetailPage
