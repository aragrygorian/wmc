import {
  FetchFunctionOptions,
  UseFetchMatch,
  UseFetchQuery,
} from '@admin/lib/useFetch/types'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { getHorizontalFilter } from '@admin/lib/useFetch/utils/getHorizontalFilter'
import { CrudModule } from '@gravis-os/types'
import useFetchBase, { UseFetchOptions } from '@admin/lib/useFetch/useFetchBase'
import { partial } from 'lodash'
import { callMethodsDynamically } from '@admin/lib/useFetch/utils/callMethodsDynamically'

type QueryKey = [
  string,
  string,
  string | undefined,
  UseFetchMatch | UseFetchMatch[] | undefined
]

const fetch = async (options: FetchFunctionOptions) => {
  const { match, module, select, ...rest } = options

  const queryBuilder = callMethodsDynamically(
    supabaseClient
      .from(module.table.name)
      .select(select, { count: 'exact', head: true }),
    {
      ...getHorizontalFilter(match),
      ...rest,
    }
  )

  const { count } = await queryBuilder

  return count ?? 0
}

const useFetchCount = (
  module: CrudModule,
  query?: UseFetchQuery,
  options?: UseFetchOptions<number, QueryKey>
) => {
  const { match, select = module?.select?.list, ...rest } = query || {}

  return useFetchBase<number, QueryKey>(
    [module.table.name, 'count', select, match],
    () => fetch({ match, module, select, ...rest }),
    options
  )
}

export const initUseFetchCount = (module: CrudModule) =>
  partial(useFetchCount, module)

export default initUseFetchCount
