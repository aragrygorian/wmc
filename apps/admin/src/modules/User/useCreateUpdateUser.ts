import { useMutation, useQueryClient } from 'react-query'
import { User } from '@prisma/client'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { userModule } from '@admin/modules/User/userConfig'

const useCreateUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({ id, ...values }: Partial<User>) =>
      supabaseClient.from(userModule.table.name).update(values).match({ id }),
    {
      onSuccess: () => queryClient.invalidateQueries([userModule.table.name]),
    }
  )
}

export default useCreateUpdateUser
