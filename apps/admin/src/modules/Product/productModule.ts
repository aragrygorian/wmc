import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import { routes } from '@admin/app/routes'

// ProductModule has to be kept separate from productConfig to prevent circular dependency
const productModule = {
  sk: 'slug',
  table: {
    name: 'product',
  },
  name: {
    singular: 'Product',
    plural: 'Products',
  },
  route: {
    plural: routes.PRODUCTS,
  },
  select: {
    list: '*, brand!inner(*, currency_factor(title, buy_rate, sell_rate), company:company_id(title, slug)), category(title)',
    detail: `*,
      product_spec_file(*),
      product_spec_image(*),
      product_gallery_image(*),
      brand(*,
        currency_factor(title, buy_rate, sell_rate)
      ),
      category(id, title),
      warehouse_ids:warehouse!warehouse_product(*)`,
  },
  relations: {
    gallery_images: { table: { name: 'product_gallery_image' } },
    spec_images: { table: { name: 'product_spec_image' } },
    spec_files: { table: { name: 'product_spec_file' } },
    warehouse: { table: { name: 'warehouse_product' } },
  },
  Icon: LocalOfferOutlinedIcon,
}

export default productModule
