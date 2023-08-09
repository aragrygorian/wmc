const inventoryModule = {
  sk: 'slug',
  table: {
    name: 'inventory',
  },
  name: {
    singular: 'Inventory',
    plural: 'Inventory',
  },
  select: {
    list: '*, warehouse_product(*)',
    detail: '*, warehouse_product(*)',
  },
}

export default inventoryModule
