import { useUser } from '@gravis-os/auth'
import { useQuery, UseQueryOptions } from 'react-query'

export type UseFetchQueryKey<K> = K

export type UseFetchOptions<T, K extends unknown[]> = UseQueryOptions<
  T,
  unknown,
  T,
  UseFetchQueryKey<K>
>

const useFetchBase = <T, K extends unknown[]>(
  queryKey: UseFetchQueryKey<K>,
  fetch: () => Promise<T>,
  options?: UseFetchOptions<T, K>
) => {
  const { user } = useUser()

  return useQuery(queryKey, fetch, {
    ...options,
    enabled:
      Boolean(user) && (options?.enabled === undefined || options?.enabled),
  })
}

export default useFetchBase
