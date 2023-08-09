import React, { useEffect, useState } from 'react'
import { StatStack } from '@gravis-os/ui'
import { useWatch } from 'react-hook-form'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import productModule from '../../Product/productModule'
import {
  getSalespersonCostAmount,
  getRetailPriceAmount,
  getCompanyCostAmount,
} from '../../Product/productUtils'
import { definitions } from '../../../types/supabase'

// TODO: Add types
const QuotationLineProductPrices = (props) => {
  const { item, formContext } = props
  const { control } = formContext

  const [product, setProduct] = useState<definitions['product']>()
  const [formProduct] = useWatch({ control, name: ['product'] })
  const { table, select } = productModule

  const getItem = async () => {
    try {
      const onItemQuery = await supabaseClient
        .from<definitions['product']>(table.name)
        .select(select?.detail || '*')
        .match({ id: formProduct.id })
        .limit(1)
        .single()
      const { data } = onItemQuery
      if (data) {
        setProduct(data)
      }
    } catch (err) {
      console.error('Error Caught:', err)
    }
  }
  useEffect(() => {
    if (formProduct) getItem()
  }, [formProduct])

  if (!product || !item) return null

  const { supplier_cost_amount } = product

  // isProject
  const isProjectBrand = Boolean(item.quotation.project.project_brand)
  const brandItem = isProjectBrand
    ? item.quotation.project.project_brand[0]
    : item.quotation.project.brand[0]

  const priceArgs = {
    ...brandItem,
    supplier_cost_amount,
    handling_rate: isProjectBrand && brandItem.handling_rate,
  }
  const salespersonCostAmount = getSalespersonCostAmount(priceArgs)
  const retailPriceAmount = getRetailPriceAmount(priceArgs)
  const companyCostAmount = getCompanyCostAmount(priceArgs)

  const items = [
    {
      key: 'retail_price_amount',
      title: retailPriceAmount,
      overline: 'Retail Price',
    },
    {
      key: 'salesperson_cost_amount',
      title: salespersonCostAmount,
      overline: 'Salesperson Cost',
    },
    {
      key: 'company_cost_amount',
      title: companyCostAmount,
      overline: 'Company Actual Cost',
    },
  ]

  return <StatStack items={items} />
}

export default QuotationLineProductPrices
