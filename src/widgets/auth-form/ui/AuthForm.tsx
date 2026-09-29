import style from './style.module.css'
import { Text } from '@/shared/ui'
import type { FC, ReactNode } from 'react'

interface IAuthFormProps {
  children?: ReactNode
  title: string
  footer?: ReactNode
}

export const AuthForm: FC<IAuthFormProps> = ({ title, footer, children }) => {
  return (
    <>
      <Text as="h1" size={40} textAlign="center" style={{ marginBlockEnd: '30px' }}>
        {title}
      </Text>
      {children}
      {footer && <div className={style.footer}>{footer}</div>}
    </>
  )
}
