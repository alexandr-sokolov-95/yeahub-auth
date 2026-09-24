import type { FC, ReactNode } from 'react'

interface IAuthFormProps {
  children?: ReactNode
  title: string
  footer: ReactNode
}

export const AuthForm: FC<IAuthFormProps> = ({ title, footer, children }) => {
  return (
    <>
      <h1>{title}</h1>
      {children}
      {footer}
    </>
  )
}
