import { Chip, InfoCardProps } from '@gravis-os/ui'
import MoneyIcon from '@mui/icons-material/Money'
import { routes } from '@warehouse/app/routes'
import { compact, isEqual, join, kebabCase, map } from 'lodash'
import React from 'react'
import { PurchaseOrderStatus } from './constants'
import { PurchaseOrder } from './types'

const getInfoCardsFromPurchaseOrders = (
  purchaseOrders: PurchaseOrder[]
): InfoCardProps[] => {
  return map(purchaseOrders, (purchaseOrder) => {
    const {
      id,
      title,
      status,
      slug,
      company,
      shipping_address_line_1: shippingAddressLine1,
      shipping_address_line_2: shippingAddressLine2,
      shipping_address_postal_code: shippingAddressPostalCode,
    } = purchaseOrder
    const { title: companyTitle } = company || {}
    const hasAddress =
      shippingAddressLine1 || shippingAddressLine2 || shippingAddressPostalCode
    return {
      key: `${id}-${kebabCase(title)}`,
      title,
      chip: (
        <Chip
          label={status}
          color={
            isEqual(PurchaseOrderStatus.GoodsReceived, status)
              ? 'success'
              : 'primary'
          }
          sx={{ borderRadius: 1 }}
        />
      ),
      icon: <MoneyIcon />,
      items: [
        { title: 'Supplier', description: companyTitle },
        {
          title: 'Shipping Address',
          description: hasAddress
            ? join(
                compact([
                  shippingAddressLine1,
                  shippingAddressLine2,
                  shippingAddressPostalCode,
                ]),
                ', '
              )
            : '-',
        },
      ],
      href: `${routes.PURCHASE_ORDER}/${slug}`,
    }
  })
}

export default getInfoCardsFromPurchaseOrders
