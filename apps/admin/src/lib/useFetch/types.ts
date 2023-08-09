import { CrudModule } from '@gravis-os/types'

export type UseFetchMatch = Record<string, unknown>

export interface UseFetchQuery {
  select?: string
  match?: UseFetchMatch | UseFetchMatch[]
  or?: string
}

export interface FetchFunctionOptions extends UseFetchQuery {
  module: CrudModule
}
