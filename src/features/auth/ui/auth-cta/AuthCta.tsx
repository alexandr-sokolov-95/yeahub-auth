import style from './style.module.css'
import { Link } from 'react-router'

type TAuthCtaType = 'register' | 'login'

export const AuthCta = ({ type }: { type: TAuthCtaType }) => {
  const text = type === 'register' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'
  const to = type === 'register' ? '/register' : '/login'
  const buttonText = type === 'register' ? 'Зарегестрироваться' : 'Войти'

  return (
    <div className={style.cta}>
      {text} <Link to={to}>{buttonText}</Link>
    </div>
  )
}
