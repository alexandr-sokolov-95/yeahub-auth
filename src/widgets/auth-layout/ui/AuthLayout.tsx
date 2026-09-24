import { Outlet } from 'react-router'
import style from './style.module.css'

export const AuthLayout = () => {
  return (
    <div className={style.layout}>
      <div className={style.banner}>Banner</div>
      <div className={style.container}>
        <Outlet />
      </div>
    </div>
  )
}
