import { forwardRef, useState } from 'react'
import { FormInput } from '../form-input'
import type { IFormInputProps } from '../form-input/FormInput'

type IFormPasswordProps = Omit<IFormInputProps, 'type' | 'rightIconSlot'>

export const FormPassword = forwardRef<HTMLInputElement, IFormPasswordProps>(({ ...rest }, ref) => {
  const [isVisible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible((prev) => !prev)
  }

  return (
    <FormInput
      ref={ref}
      type={isVisible ? 'text' : 'password'}
      rightIconSlot={
        <button type="button" onClick={toggleVisibility} tabIndex={-1}>
          {isVisible ? '🙈' : '👁'}
        </button>
      }
      {...rest}
    />
  )
})
