export const enum PurchaseOrderStatus {
  New = 'New',
  EtaOverdue = 'ETA Overdue',
  Paid = 'Paid',
  Unpaid = 'Unpaid',
  PendingPayment = 'Pending Payment',
  PendingStockArrival = 'Pending Stock Arrival',
  Completed = 'Completed',
  GoodsReceived = 'Goods Received',
  Void = 'Void',
}

export const enum PurchaseOrderLineStatus {
  New = 'New',
  Received = 'Received',
}
