import { getAccessToken } from '@/shared/lib/localstorage'
import { useGetMeQuery } from '../api'
import { useAppSelector } from '@/shared/lib/store'
import { isUserAuth, selectUser } from '../model/reducer/selectors'

export const useCurrentUser = () => {
  const token = getAccessToken()
  const { isLoading } = useGetMeQuery(undefined, { skip: !token })
  const user = useAppSelector(selectUser)
  const isAuth = useAppSelector(isUserAuth)

  return { user, isAuth, isLoading }
}
