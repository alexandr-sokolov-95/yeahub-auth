import type { FC, SVGProps } from 'react'

interface IUIButtonIcon {
  icon: FC<SVGProps<SVGSVGElement>>
  className?: string
}

export const UIButtonIcon: FC<IUIButtonIcon> = ({ icon, className }) => {
  const Tag = icon
  return <Tag className={className}></Tag>
}
