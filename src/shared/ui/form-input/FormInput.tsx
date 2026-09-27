import style from './style.module.css'
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import type { FieldError } from 'react-hook-form'
import { ErrorMessage } from '../error-message'
import { Text } from '../text'
import clsx from 'clsx'

export interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: FieldError
  leftIconSlot?: ReactNode
  rightIconSlot?: ReactNode
}

export const FormInput = forwardRef<HTMLInputElement, IFormInputProps>(
  ({ label, error, leftIconSlot, rightIconSlot, ...rest }, ref) => {
    const className = clsx(style.input, error && style.error)
    return (
      <div>
        {label && (
          <Text as="label" style={{ marginBlockEnd: '8px' }}>
            {label}
          </Text>
        )}
        <div style={{ position: 'relative' }}>
          {leftIconSlot}
          <input className={className} ref={ref} {...rest} />
          {rightIconSlot}
        </div>
        {error && <ErrorMessage text={error.message} />}
      </div>
    )
  },
)
