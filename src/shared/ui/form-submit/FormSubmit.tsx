import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import { Loader } from '../loader'
import style from './style.module.css'

interface IFormSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading: boolean
}

export const FormSubmit: FC<IFormSubmitProps> = ({ children, isLoading, ...props }) => {
  return (
    <button type="submit" className={style.button} {...props}>
      {isLoading ? <Loader size={18} /> : children}
    </button>
  )
}
