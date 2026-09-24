import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import type { FieldError } from 'react-hook-form'
import { ErrorMessage } from '../error-message'

export interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: FieldError
  leftIconSlot?: ReactNode
  rightIconSlot?: ReactNode
}

export const FormInput = forwardRef<HTMLInputElement, IFormInputProps>(
  ({ label, error, leftIconSlot, rightIconSlot, ...rest }, ref) => {
    return (
      <>
        {label && <label>{label}</label>}
        <div style={{ position: 'relative' }}>
          {leftIconSlot}
          <input ref={ref} {...rest} />
          {rightIconSlot}
        </div>
        {error && <ErrorMessage text={error.message} />}
      </>
    )
  },
)
