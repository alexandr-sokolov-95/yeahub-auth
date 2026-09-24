import { useCurrentUser } from '@/entities/user/hooks/useCurrentUser'
import { Navigate, Outlet, useLocation } from 'react-router'

export const RequireAuth = () => {
  const location = useLocation()
  const { isAuth, isLoading } = useCurrentUser()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}
