import style from './style.module.css'
import { ErrorMessage, FormInput, FormPassword } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { useLoginMutation } from '../../api'
import { isApiErrorBody, isFetchBaseQueryError } from '@/shared/lib/api/error'

const schema = z.object({
  username: z.string().email('Введите валидный email'),
  password: z.string().min(1, 'Введите пароль'),
})

type FormFields = z.infer<typeof schema>

export const LoginForm = () => {
  const [login] = useLoginMutation()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const result = await login(data)

    if ('error' in result) {
      const { error } = result

      if (isFetchBaseQueryError(error) && isApiErrorBody(error.data)) {
        setError('root', { message: error.data.description })
      } else {
        setError('root', { message: 'Ошибка авторизации' })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <FormInput
        label="Электронная почта"
        type="text"
        placeholder="Введите почту"
        error={errors.username}
        {...register('username')}
      />
      <FormPassword
        placeholder="Введите пароль"
        label="Пароль"
        {...register('password')}
        error={errors.password}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Войти'}
      </button>
      {errors.root && <ErrorMessage text={errors.root.message} />}
    </form>
  )
}
