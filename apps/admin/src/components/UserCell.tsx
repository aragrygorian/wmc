import useUser from '@admin/app/useUser'
import { User } from '@prisma/client'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { useQuery } from 'react-query'
import { userModule } from 'src/modules/User/userConfig'

interface UserCellProps {
  id?: string | null
  pk?: string
}

const UserCell: React.FC<UserCellProps> = (props) => {
  const { id, pk = 'title' } = props
  const { user } = useUser()
  const { data: creator } = useQuery({
    queryKey: [userModule.table.name, id],
    queryFn: async () => {
      const { data: user } = await supabaseClient
        .from<User>(userModule.table.name)
        .select(`title, ${pk}`)
        .eq('id', id as string)
        .maybeSingle()
      return user
    },
    enabled: Boolean(user && id),
  })

  return <div>{creator?.[pk] ?? creator?.title}</div>
}

export default UserCell
