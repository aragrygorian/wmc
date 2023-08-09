import React from 'react'
import { useQuery } from 'react-query'
import { ControllerRenderProps, useWatch } from 'react-hook-form'
import { projectProductModule } from '@admin/modules/Project/projectProductConfig'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

interface QuotationProjectProductDiscountsFieldProps
  extends ControllerRenderProps {}

const QuotationProjectProductDiscountsField = React.forwardRef<
  unknown,
  QuotationProjectProductDiscountsFieldProps
>((props) => {
  const { onChange } = props
  const [project] = useWatch({ name: ['project_id'] })
  const tableName = projectProductModule.table.name
  const selector = `*,
    product(*),
    project_brand:project_brand_id(*,
      project_currency_factor:project_currency_factor_id(*)
    )`
  const matcher = { project_id: project?.id }
  useQuery({
    queryKey: [tableName, selector, matcher],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from(tableName)
        .select(selector)
        .match(matcher)
      return data
    },
    enabled: Boolean(project),
    onSuccess: onChange,
  })

  return null
})

export default QuotationProjectProductDiscountsField
