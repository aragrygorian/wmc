const purchaseOrderModule = {
  sk: 'slug',
  table: {
    name: 'purchase_order',
  },
  name: {
    singular: 'Purchase Order',
    plural: 'Purchase Orders',
  },
  select: {
    list: `*,
      company(id, title, slug),
      lines:purchase_order_line(id,
        order_form_line:order_form_line_id(id,
          order_form(id, title)
        )
      )`,
    detail: `*,
      company(*),
      contact(*),
      warehouse(*),
      currency_factor(*,
        project_currency_factor(*)
      ),
      lines:purchase_order_line(*,
        product:product_id(*),
        purchase_order(*),
        inventory(*),
        order_form_line:order_form_line_id(*,
          order_form(*)
        )
      )`,
  },
  relations: {
    lines: { table: { name: 'purchase_order_line' } },
  },
}

export default purchaseOrderModule
