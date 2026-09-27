import type { FC, HTMLAttributes, ReactNode } from 'react'
import style from './style.module.css'

interface IFormProps extends HTMLAttributes<HTMLFormElement> {
  children?: ReactNode
}

export const Form: FC<IFormProps> = ({ children, ...props }) => (
  <form className={style.form} {...props}>
    {children}
  </form>
)
