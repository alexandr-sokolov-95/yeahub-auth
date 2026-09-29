import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import style from './style.module.css'
import type { FieldError } from 'react-hook-form'
import clsx from 'clsx'

interface IFormCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode
  error?: FieldError
}

export const FormCheckbox = forwardRef<HTMLInputElement, IFormCheckboxProps>(
  ({ children, error, ...rest }, ref) => {
    const className = clsx(style.input, error && style.error)

    return (
      <div className={style.checkbox}>
        <input ref={ref} type="checkbox" className={className} {...rest} />
        {children}
      </div>
    )
  },
)
