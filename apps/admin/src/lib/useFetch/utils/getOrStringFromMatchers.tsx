import { UseFetchMatch } from '@admin/lib/useFetch'

export const getOrStringFromMatchers = (matchers: UseFetchMatch[]): string =>
  matchers
    .map((matchObject) => {
      const filter = Object.entries(matchObject).map(
        ([column, value]) => `${column}.eq.${value}`
      )

      return `and(${filter.join(',')})`
    })
    .join(',')
