import { toPairs } from 'lodash'

export const callMethodsDynamically = <T,>(
  instance: T,
  methods: Record<string, unknown>
) =>
  toPairs(methods).reduce(
    (result, [method, args]) =>
      // eslint-disable-next-line prefer-spread
      result?.[method]?.apply(result, Array.isArray(args) ? args : [args]),
    instance
  )
