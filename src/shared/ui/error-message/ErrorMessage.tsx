import type { FC } from 'react'
import style from './style.module.css'

interface ErrorMessageProps {
  text: string | undefined
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => {
  if (!text) return null
  return <span className={style.message}>{text}</span>
}
