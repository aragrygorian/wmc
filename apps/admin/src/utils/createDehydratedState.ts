import { dehydrate, QueryClient } from 'react-query'

export const createDehydratedState = async (context, { queryFn, queryKey }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(queryKey, queryFn)

  return dehydrate(queryClient)
}
