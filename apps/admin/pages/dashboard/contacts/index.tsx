import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ListPage } from '@gravis-os/crud'
import { Theme, useMediaQuery } from '@mui/material'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import {
  contactColumnDefs as injectedContactColumnDefs,
  contactFilterFormSections,
  contactModule,
  contactPreviewFormSections,
} from '@admin/modules/Contact'
import { getContactStatusColor } from '@admin/modules/Contact/utils/getContactStatusColor'
import StatusCell from '@admin/components/StatusCell'

const ContactListPage: NextPage = () => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const contactColumnDefs = [
    ...injectedContactColumnDefs,
    {
      field: 'status',
      pinned: mdUp ? 'right' : false,
      maxWidth: 150,
      cellRenderer: ({ value }) => (
        <StatusCell color={getContactStatusColor(value)} label={value} />
      ),
    },
  ]

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard: Contact List</title>
      </Head>

      <ListPage
        module={contactModule}
        columnDefs={contactColumnDefs}
        previewFormSections={contactPreviewFormSections}
        filterFormSections={contactFilterFormSections}
      />
    </DashboardLayout>
  )
}

export default ContactListPage
