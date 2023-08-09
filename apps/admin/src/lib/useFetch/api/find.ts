import { CrudModule } from '@gravis-os/types'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

export const find =
  <T>(module: CrudModule) =>
  async ({ match, client = supabaseClient }) => {
    const { data } = await client
      .from<T>(module.table.name)
      .select(module?.select?.detail || '')
      .match(match)
      .single()

    return data
  }
