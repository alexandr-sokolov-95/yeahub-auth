import type { FC } from 'react'
import style from './style.module.css'
import { Text } from '../text'

interface ErrorMessageProps {
  text: string | undefined
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => {
  if (!text) return null
  return (
    <Text size={12} color="var(--color-error)" className={style.message}>
      {text}
    </Text>
  )
}
