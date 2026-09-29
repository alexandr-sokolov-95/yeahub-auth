import clsx from 'clsx'
import style from './style.module.css'
import type { FC, SVGProps } from 'react'
import Spinner from '@/shared/assets/icons/spinner.svg?react'

interface ILoaderProps extends SVGProps<SVGSVGElement> {
  size?: number
  color?: 'accent' | 'white'
}

export const Loader: FC<ILoaderProps> = ({ size = 80, color = 'white' }) => (
  <Spinner
    className={clsx(style.spinner, color === 'accent' && style.accent)}
    width={size}
    height={size}
  ></Spinner>
)
