import { useUser as useGvsUser, UserContextInterface } from '@gravis-os/auth'
import { AppUser } from './types'

export interface UseUserReturn extends UserContextInterface<AppUser> {}

const useUser = (): UseUserReturn => {
  return useGvsUser<AppUser>()
}

export default useUser
