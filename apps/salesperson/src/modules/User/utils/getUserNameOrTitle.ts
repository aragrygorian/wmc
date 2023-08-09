import { userModule } from '@admin/modules/User/userConfig'
import { User as PrismaUser } from '@prisma/client'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { find, isEmpty, isNil } from 'lodash'

const getUserNameOrTitle = async (
  id: string | undefined | null
): Promise<string | null> => {
  if (isNil(id)) return null
  const { data } = await supabaseClient
    .from(userModule.table.name)
    .select()
    .match({ id })
  if (isEmpty(data)) return null
  const user: PrismaUser = find(data, Boolean)
  const { title, full_name: fullName } = user
  return fullName ?? title
}

export default getUserNameOrTitle
