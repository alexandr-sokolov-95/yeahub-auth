import type { FC, SVGProps } from 'react'
import clsx from 'clsx'
import Logo from '@/shared/assets/icons/yeahub-logo.svg?react'
import style from './style.module.css'

interface IYeahubLogoProps extends SVGProps<SVGSVGElement> {
  size?: 'default' | 'small'
  theme?: 'default' | 'white'
  layout?: 'default' | 'logo' | 'text'
}

const defaultScale = 190 / 45

export const YeahubLogo: FC<IYeahubLogoProps> = ({
  size = 'default',
  theme = 'default',
  layout = 'default',
  ...props
}) => {
  const scale = layout === 'default' ? defaultScale : layout === 'logo' ? 1 : defaultScale
  const height = size === 'default' ? 45 : 33
  const width = height * scale
  const viewBox = `${layout === 'text' ? 50 : 0} 0 ${layout === 'logo' ? 45 : 190} 45`

  const className = clsx(style[`theme-${theme}`])

  return <Logo className={className} width={width} height={height} viewBox={viewBox} {...props} />
}
