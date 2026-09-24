import { useCurrentUser } from '@/entities/user/hooks/useCurrentUser'
import style from './style.module.css'
import { Link } from 'react-router'

export const Header = () => {
  const { user, isAuth, isLoading } = useCurrentUser()

  return (
    <div className={style.header}>
      {isLoading ? (
        <span>Загрузка...</span>
      ) : isAuth ? (
        <Link to="/dashboard">Профиль {user?.username}</Link>
      ) : (
        <Link to="/login">Войти</Link>
      )}
    </div>
  )
}
