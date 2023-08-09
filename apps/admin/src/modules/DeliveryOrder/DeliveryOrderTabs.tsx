import React from 'react'
import DeliveryOrderDeliveryHistoryTab from './DeliveryOrderDeliveryHistoryTab'
import DeliveryOrderGeneralTab from './DeliveryOrderGeneralTab'
import FulfillmentTab from './FulfillmentTab'

export const deliveryOrderTabs = [
  {
    key: 'general',
    value: 'general',
    label: 'General',
    render: ({ item }) => <DeliveryOrderGeneralTab deliveryOrder={item} />,
  },
  {
    key: 'delivery_order_lines',
    value: 'delivery_order_lines',
    label: 'Fulfillment',
    render: ({ item }) => <FulfillmentTab deliveryOrder={item} />,
  },
  {
    key: 'delivery_history',
    value: 'delivery_history',
    label: 'Delivery History',
    render: ({ item }) => (
      <DeliveryOrderDeliveryHistoryTab deliveryOrder={item} />
    ),
  },
]
