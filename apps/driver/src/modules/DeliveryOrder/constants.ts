export const enum DeliveryOrderStatus {
  New = 'New',
  PendingDelivery = 'Pending Delivery',
  DeliveredPartial = 'Delivered (Partial)',
  Delivered = 'Delivered',
  Void = 'Void',
}

export const DELIVERY_ORDER_STATUS_QUERY_KEY = 'status'
