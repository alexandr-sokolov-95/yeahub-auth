import { useCurrentUser } from '@/entities/user/hooks/useCurrentUser'
import style from './style.module.css'
import { Link } from 'react-router'
import { Loader, UIButton, YeahubLogo } from '@/shared/ui'
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
        <Link to="/dashboard">
          <UIButton variant="outline">Профиль {user?.username}</UIButton>
        </Link>
      ) : (
        <div className={style.auth}>
          <Link to="/login">
            <UIButton variant="link">Войти</UIButton>
          </Link>
          <Link to="/register">
            <UIButton>Регистрация</UIButton>
          </Link>
        </div>
      )}
    </div>
  )
}
