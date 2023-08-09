/** Warehouse module used specifically for the driver mobile app. */
export const warehouseModule = {
  sk: 'slug',
  table: {
    name: 'warehouse',
  },
  name: {
    singular: 'Location',
    plural: 'Locations',
  },
  select: {
    detail: '*, pick_and_packs:delivery_instruction(*)',
    list: '*',
  },
}
