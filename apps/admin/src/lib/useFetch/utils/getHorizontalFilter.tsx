import { UseFetchMatch } from '@admin/lib/useFetch'
import { getOrStringFromMatchers } from '@admin/lib/useFetch/utils/getOrStringFromMatchers'

export const getHorizontalFilter = (
  match?: UseFetchMatch | UseFetchMatch[]
): { match?: UseFetchMatch; or?: string } => {
  return {
    ...(match &&
      Array.isArray(match) && { or: getOrStringFromMatchers(match) }),
    ...(match && !Array.isArray(match) && { match }),
  }
}
