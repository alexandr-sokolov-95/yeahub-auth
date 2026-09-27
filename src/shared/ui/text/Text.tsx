import type { FC, HTMLAttributes, ReactNode } from 'react'
import style from './style.module.css'
import clsx from 'clsx'

type HTMLTextType = keyof Pick<
  HTMLElementTagNameMap,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label' | 'div'
>

type TextSize = 12 | 14 | 16 | 18 | 20 | 24 | 32 | 40

interface ITextProps extends HTMLAttributes<HTMLElement> {
  as?: HTMLTextType
  children?: ReactNode
  className?: string
  size?: TextSize
  color?: string
  textAlign?: 'start' | 'center' | 'end'
}

export const Text: FC<ITextProps> = ({
  as = 'span',
  children,
  className,
  size = 14,
  color = 'inherit',
  textAlign = 'start',
  ...props
}) => {
  const Tag = as
  const styleClass = clsx(
    style.text,
    style[`size-${size}`],
    Tag.includes('h') && style.medium,
    style[`align-${textAlign}`],
    className,
  )

  return (
    <Tag className={styleClass} style={{ color }} {...props}>
      {children}
    </Tag>
  )
}
