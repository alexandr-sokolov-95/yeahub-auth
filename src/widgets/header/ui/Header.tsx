import { useCurrentUser } from '@/entities/user/hooks/useCurrentUser'
import style from './style.module.css'
import { Link } from 'react-router'
import { Loader, YeahubLogo } from '@/shared/ui'
import { useBreakpoints } from '@/shared/lib/hooks'

export const Header = () => {
  const { user, isAuth, isLoading } = useCurrentUser()
  const { isMobile } = useBreakpoints()

  return (
    <div className={style.header}>
      <Link to="/">
        <YeahubLogo size="small" layout={isMobile ? 'logo' : 'default'} />
      </Link>
      {isLoading ? (
        <Loader size={24} color="accent" />
      ) : isAuth ? (
        <Link to="/dashboard">Профиль {user?.username}</Link>
      ) : (
        <div className={style.auth}>
          <Link to="/login">Войти</Link>
          <Link to="/register">Регистрация</Link>
        </div>
      )}
    </div>
  )
}
