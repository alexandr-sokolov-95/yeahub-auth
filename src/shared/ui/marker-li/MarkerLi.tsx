import type { FC, HTMLAttributes, ReactNode } from 'react'
import style from './style.module.css'

interface IMarkerLiProps extends HTMLAttributes<HTMLLIElement> {
  marker?: ReactNode
  children?: ReactNode
}

export const MarkerLi: FC<IMarkerLiProps> = ({ marker, children }) => {
  return (
    <li className={style.li}>
      {marker && marker}
      {children}
    </li>
  )
}
