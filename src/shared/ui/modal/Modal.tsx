import type { FC, ReactNode } from 'react'
import style from './style.module.css'

interface IModalProps {
  children?: ReactNode
  isOpen: boolean
  handleClose: () => void
}

export const Modal: FC<IModalProps> = ({ children, isOpen = false, handleClose }) => {
  const onClose = () => handleClose()
  return (
    <>
      {isOpen && (
        <div className={style.modal}>
          <div className={style.content}>
            <button className={style.close} type="button" onClick={onClose}></button>
            {children}
          </div>
        </div>
      )}
    </>
  )
}
