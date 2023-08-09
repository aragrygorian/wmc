import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { DetailPage, getIsNew, useGetItem } from '@gravis-os/crud'
import { Contact } from '@gravis-os/apps/crm'
import DashboardLayout from '@admin/layouts/DashboardLayout'
import { contactFormSections, contactModule } from '@admin/modules/Contact'
import ContactTemplate from '@admin/modules/Contact/ContactTemplate'

const ContactDetailPage: NextPage = () => {
  const onUseGetItem = useGetItem({ module: contactModule })
  const { item, loading } = onUseGetItem
  const isNew = getIsNew(item)
  const contact = loading ? null : (item as Contact)

  return (
    <DashboardLayout disablePadding>
      <Head>
        <title>Dashboard: Contact Detail</title>
      </Head>

      {isNew ? (
        <DetailPage module={contactModule} formSections={contactFormSections} />
      ) : (
        <ContactTemplate item={contact} />
      )}
    </DashboardLayout>
  )
}

export default ContactDetailPage
