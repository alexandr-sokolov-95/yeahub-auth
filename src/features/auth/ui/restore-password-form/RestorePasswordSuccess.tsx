import { Loader, Text } from '@/shared/ui'
import style from './success.module.css'
import { type FC } from 'react'
import E from '@/shared/assets/icons/envelope.svg'

interface IRestorePasswordSuccessProps {
  isFormSubmitting: boolean
  timer: number
}

export const RestorePasswordSuccess: FC<IRestorePasswordSuccessProps> = ({
  isFormSubmitting,
  timer,
}) => {
  return (
    <div className={style.container}>
      <img src={E} alt="envelope-icon." />
      <div className={style['text-container']}>
        <Text as="h2" size={24} textAlign="center" style={{ marginBlockEnd: 'var(--size-8)' }}>
          Мы отправили письмо с инструкциями
        </Text>
        <Text as="p" textAlign="center">
          Если вы не получили письмо с инструкциями, проверьте, пожалуйста, папку «Спам» или
          попробуйте отправить запрос ещё раз
        </Text>
      </div>
      {timer !== 0 && <div>Повторная отправка через {timer} с</div>}
      <button type="submit" className={style.submit} disabled={isFormSubmitting || timer !== 0}>
        {isFormSubmitting ? <Loader color="accent" size={24} /> : 'Отправить повторно'}
      </button>
    </div>
  )
}
