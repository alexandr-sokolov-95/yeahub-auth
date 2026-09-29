import { ErrorMessage, Form, FormInput, FormSubmit, Modal, Text } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { isApiErrorBody, isFetchBaseQueryError } from '@/shared/lib/api/error'
import { useSendResetEmailMutation } from '../../api/auth-api'
import { useEffect, useState } from 'react'
import { RestorePasswordSuccess } from './RestorePasswordSuccess'

const schema = z.object({
  email: z.string('Введите почту').email('Введите валидный email'),
})

type FormFields = z.infer<typeof schema>

const TIMER_LIMIT = 5

export const RestorePasswordForm = () => {
  const [sendResetEmail] = useSendResetEmailMutation()
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  })
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [successCount, setSuccessCount] = useState<number>(0)
  const [timer, setTimer] = useState<number>(0)
  const isExtraSubmit = successCount >= 1

  useEffect(() => {
    if (timer !== 0) {
      setTimeout(() => setTimer((prev) => prev - 1), 1000)
    }
  }, [timer])

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const result = await sendResetEmail(data)

    if ('data' in result && !isModalOpen) {
      setModalOpen(true)
    }

    if ('error' in result) {
      const { error } = result

      if (isFetchBaseQueryError(error) && isApiErrorBody(error.data)) {
        setError('root', { message: error.data.description })
      } else {
        setError('root', { message: 'Ошибка, попробуйте еще раз' })
      }
    } else {
      setSuccessCount((prev) => prev + 1)
      if (isExtraSubmit) setTimer(TIMER_LIMIT)
    }
  }

  const handleModalClose = () => {
    reset()
    setModalOpen(false)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Text color="var(--color-text-faint)">
        Для восстановления пароля введите адрес эл.почты, на который вы регистрировались. Мы
        отправим письмо для воссталовления пароля
      </Text>
      <FormInput
        label="Электронная почта"
        type="text"
        placeholder="Введите почту"
        error={errors.email}
        {...register('email')}
      />
      <FormSubmit isLoading={isSubmitting} disabled={isSubmitting}>
        Отправить
      </FormSubmit>
      {errors.root && <ErrorMessage text={errors.root.message} />}
      <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
        <RestorePasswordSuccess isFormSubmitting={isSubmitting} timer={timer} />
      </Modal>
    </Form>
  )
}
