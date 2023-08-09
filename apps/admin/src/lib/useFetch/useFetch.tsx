import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { getHorizontalFilter } from '@admin/lib/useFetch/utils/getHorizontalFilter'
import { CrudModule } from '@gravis-os/types'
import { partial } from 'lodash'
import useFetchBase, { UseFetchOptions } from '@admin/lib/useFetch/useFetchBase'
import { callMethodsDynamically } from '@admin/lib/useFetch/utils/callMethodsDynamically'
import { FetchFunctionOptions, UseFetchMatch, UseFetchQuery } from './types'

type QueryKey = [
  string,
  string | undefined,
  UseFetchMatch | UseFetchMatch[] | undefined
]

const fetch = async <T,>(options: FetchFunctionOptions) => {
  const { match, module, select, ...rest } = options

  const queryBuilder = callMethodsDynamically(
    supabaseClient.from<T>(module.table.name).select(select),
    {
      ...getHorizontalFilter(match),
      ...rest,
    }
  )

  const { data } = await queryBuilder

  return data ?? []
}

const useFetch = <T,>(
  module: CrudModule,
  query?: UseFetchQuery,
  options?: UseFetchOptions<T[], QueryKey>
) => {
  const { match, select = module?.select?.list, ...rest } = query || {}

  return useFetchBase<T[], QueryKey>(
    [module.table.name, select, match],
    () => fetch<T>({ match, module, select, ...rest }),
    options
  )
}

export const initUseFetch = <T,>(module: CrudModule) =>
  partial(useFetch<T>, module)

export default initUseFetch
