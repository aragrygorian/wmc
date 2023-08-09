import React from 'react'
import { Container, useTheme } from '@mui/system'
import { Calendar } from '@gravis-os/apps/calendar'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import Head from 'next/head'
import { PageHeader } from '@gravis-os/crud'
import { useFetchDeliveryOrders } from '@admin/modules/DeliveryOrder/hooks/useFetchDeliveryOrder'
import ModuleLink from '@admin/components/ModuleLink'
import { deliveryOrderModule } from '@admin/modules/DeliveryOrder'
import { Typography } from '@mui/material'
import useUser from '@admin/app/useUser'
import { useFetchPermissions } from '@admin/modules/Permission/hooks/useFetchPermission'
import { getIsAdmin } from '@admin/modules/Permission/utils/getIsAdmin'

interface DeliveryOrderCalendarPageProps {}

const DeliveryOrderCalendarPage: React.FC<
  DeliveryOrderCalendarPageProps
> = () => {
  const theme = useTheme()
  const { user } = useUser()

  const { data: permissions = [] } = useFetchPermissions({
    select: '*, role_permission!inner(*)',
    match: { 'role_permission.role_id': user?.role_id },
  })

  const isAdmin = getIsAdmin(permissions)

  const { data: deliveryOrders = [] } = useFetchDeliveryOrders(
    {
      match: isAdmin ? null : { assignee_id: user.id },
    },
    { enabled: Boolean(permissions.length) }
  )

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Delivery Calendar</title>
      </Head>

      <Container component="div" maxWidth="xl">
        <PageHeader
          title="Delivery Calendar"
          breadcrumbs={[
            {
              key: 'Delivery Calendar',
              title: 'Delivery Calendar',
              href: '/dashboard/delivery-orders/calendar',
            },
          ]}
        />
        <Calendar
          eventDrawerDefs={[
            {
              title: 'DO Reference',
              render: ({ data }) => (
                <ModuleLink module={deliveryOrderModule} item={data} />
              ),
            },
            {
              name: 'company.title',
              title: 'Company',
            },
            {
              title: 'Address',
              render: ({ data }) =>
                [
                  [
                    data.shipping_address_line_1,
                    data.shipping_address_line_2,
                  ].join(' '),
                  data.shipping_address_postal_code,
                ].map((segment) => (
                  <Typography key={segment}>{segment}</Typography>
                )),
            },
            {
              name: 'contact.title',
              title: 'Contact',
            },
            {
              name: 'internal_notes',
              title: 'Notes',
            },
          ]}
          events={deliveryOrders.map((deliveryOrder) => ({
            color: theme.palette.primary.main,
            id: deliveryOrder.id.toString(),
            subtitle: deliveryOrder.driver_name,
            start: deliveryOrder.delivery_at,
            title: deliveryOrder.company?.title,
            data: deliveryOrder,
          }))}
          height="82.5vh"
        />
      </Container>
    </DashboardLayout>
  )
}

export default DeliveryOrderCalendarPage
