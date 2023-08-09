import React from 'react'
import type { NextPage } from 'next'
import { Stack } from '@gravis-os/ui'
import { PosProductList, usePos } from '@gravis-os/apps/pos'
import PosLayout from '@pos/layouts/PosLayout'
import ProductModule from '@admin/modules/Product/productModule'
import { useList } from '@gravis-os/query'
import { routes } from '@pos/app/routes'

const PosProductsPage: NextPage = () => {
  const { addToCart } = usePos()

  // List items
  const onUseList = useList({
    module: ProductModule,
  })

  return (
    <PosLayout
      title="Products"
      breadcrumbs={[
        { key: 'home', title: 'POS', href: routes.POS_HOME },
        { key: 'products', title: 'Products', href: routes.POS_PRODUCTS },
      ]}
    >
      <Stack>
        <PosProductList
          queryResult={{
            ...onUseList,
            items: onUseList?.items?.map((item) => ({
              ...item,
              // TODO: Replace this with the actual price
              price: item?.supplier_cost_amount,
            })),
          }}
          onClick={(e, item) => addToCart(item)}
        />
      </Stack>
    </PosLayout>
  )
}

export default PosProductsPage
