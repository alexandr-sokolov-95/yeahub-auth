import { ErrorMessage, Form, FormInput, FormPassword, FormSubmit, Text } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { useLoginMutation } from '../../api'
import { isApiErrorBody, isFetchBaseQueryError } from '@/shared/lib/api/error'
import { Link } from 'react-router'

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
        const message =
          error.status === 401
            ? 'Ошибка авторизации, попробуйте еще раз'
            : 'Что-то пошло не так, попробуйте еще раз'
        setError('root', { message: message })
      } else {
        setError('root', { message: 'Ошибка авторизации' })
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
      <Text size={12} textAlign="end" color="var(--color-accent)">
        <Link to="/restore-password">Забыли пароль?</Link>
      </Text>
      <FormSubmit
        isLoading={isSubmitting}
        disabled={isSubmitting}
        style={{ marginBlockStart: 'var(--size-24)' }}
      >
        Войти
      </FormSubmit>
      {errors.root && <ErrorMessage text={errors.root.message} />}
    </Form>
  )
}
