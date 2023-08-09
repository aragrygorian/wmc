import { CrudForm, CrudFormLayout } from '@gravis-os/crud'
import React from 'react'
import productModule from './productModule'
import { productFormSections } from './productConfig'
import ProductInventoryTab from './components/ProductInventoryTab'
import ProductReservationTab from './components/ProductReservationTab'

export const productTabs = [
  {
    key: 'general',
    value: 'general',
    label: 'General',
    children: (
      <CrudForm
        module={productModule}
        sections={productFormSections}
        disableHeader
      >
        {({ formJsx, formControlJsx }) => (
          <CrudFormLayout rightAside={formControlJsx}>{formJsx}</CrudFormLayout>
        )}
      </CrudForm>
    ),
  },
  {
    key: 'inventory',
    value: 'inventory',
    label: 'Inventory',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    children: <ProductInventoryTab />,
  },
  {
    key: 'reservation',
    value: 'reservation',
    label: 'Reservation',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    children: <ProductReservationTab />,
  },
]
