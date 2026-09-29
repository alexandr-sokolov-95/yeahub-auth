import type { ButtonHTMLAttributes, FC, HTMLAttributes, ReactNode, SVGProps } from 'react'
import style from './style.module.css'
import clsx from 'clsx'
import { UIButtonIcon } from './UIButtonIcon'

type HTMLButtonType = keyof Pick<HTMLElementTagNameMap, 'button' | 'div' | 'span'>

type StyleType = 'positive' | 'negative'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'link'

interface IUIButtonProps
  extends
    HTMLAttributes<HTMLElement>,
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled'> {
  as?: HTMLButtonType
  children?: ReactNode
  className?: string
  styleType?: StyleType
  variant?: Variant
  iconStart?: FC<SVGProps<SVGSVGElement>>
  iconEnd?: FC<SVGProps<SVGSVGElement>>
}

export const UIButton: FC<IUIButtonProps> = ({
  as = 'div',
  children,
  className,
  styleType = 'positive',
  variant = 'primary',
  iconStart,
  iconEnd,
  ...rest
}) => {
  const Tag = as

  const styleClass = clsx(style.button, style[`${styleType}`], style[`${variant}`], className)

  return (
    <Tag className={styleClass} {...rest}>
      {iconStart && <UIButtonIcon icon={iconStart} className={style.icon} />}
      {children}
      {iconEnd && <UIButtonIcon icon={iconEnd} className={style.icon} />}
    </Tag>
  )
}
