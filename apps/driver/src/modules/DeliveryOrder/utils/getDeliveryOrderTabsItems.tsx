import { DeliveryOrderTabsItemProps } from '@driver/modules/DeliveryOrder/components/DeliveryOrderTabs'
import { DeliveryOrder } from '@driver/modules/DeliveryOrder/types'
import { compact, join, map } from 'lodash'

export const getDeliveryOrderTabsItemsFromDeliveryOrders = (
  deliveryOrders: DeliveryOrder[]
): DeliveryOrderTabsItemProps[] => {
  return map(deliveryOrders, (deliveryOrder) => {
    const {
      title,
      status,
      company,
      // Renaming to prevent eslint error not camelCase
      shipping_address_line_1: shippingAddressLine1,
      shipping_address_line_2: shippingAddressLine2,
      shipping_address_postal_code: shippingAddressPostalCode,
      slug,
    } = deliveryOrder
    // Handle case when address is empty to display placeholder dash instead
    const hasAddress =
      shippingAddressLine1 || shippingAddressLine2 || shippingAddressPostalCode
    return {
      title,
      status: status ?? '-',
      company: company?.title ?? '-',
      address: hasAddress
        ? join(
            compact([
              shippingAddressLine1,
              shippingAddressLine2,
              shippingAddressPostalCode,
            ]),
            ', '
          )
        : '-',
      slug,
    }
  })
}
