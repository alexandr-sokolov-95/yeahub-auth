import { selectUser } from '@/entities/user/model/reducer/selectors'
import { useLazyLogoutQuery } from '@/features/auth/api'
import { useAppSelector } from '@/shared/lib/store'

export const Dashboard = () => {
  const user = useAppSelector(selectUser)
  const [logout] = useLazyLogoutQuery()

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <h1>Dashboard home</h1>
      <h3>Добро пожаловать, {user?.username}</h3>
      <h3>Твоя почта: {user?.email}</h3>
      <button type="button" onClick={handleLogout}>
        Выйти
      </button>
    </>
  )
}
