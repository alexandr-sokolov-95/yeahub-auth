import { useCurrentUser } from '@/entities/user/hooks/useCurrentUser'
import { Navigate, Outlet, useLocation, type Location } from 'react-router'

export const RequireGuest = () => {
  const location = useLocation()
  const { isAuth, isLoading } = useCurrentUser()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isAuth) {
    const from = (location.state as { from?: Location })?.from?.pathname ?? '/'
    return <Navigate to={from} replace />
  }

  return <Outlet />
}
