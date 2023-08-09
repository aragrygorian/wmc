import React from 'react'
import { useQuery } from 'react-query'
import { ControllerRenderProps, useWatch } from 'react-hook-form'
import { projectBrandModule } from '@admin/modules/Project/projectBrandConfig'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

interface QuotationProjectBrandDiscountsFieldProps
  extends ControllerRenderProps {}

const QuotationProjectBrandDiscountsField = React.forwardRef<
  unknown,
  QuotationProjectBrandDiscountsFieldProps
>((props) => {
  const { onChange } = props
  const [project] = useWatch({ name: ['project_id'] })
  const tableName = projectBrandModule.table.name
  const selector = '*, project_currency_factor:project_currency_factor_id(*)'
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

export default QuotationProjectBrandDiscountsField
