import { useForm, type SubmitHandler } from 'react-hook-form'
import style from './style.module.css'
import { ErrorMessage, FormInput, FormPassword } from '@/shared/ui'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation } from '../../api'
import { isApiErrorBody, isFetchBaseQueryError } from '@/shared/lib/api/error'

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const schema = z
  .object({
    username: z.string().min(2, 'Нинейм должен содержать минимум 2 символа'),
    email: z.string().email('Введите валидный email'),
    password: z.string().min(8, 'Минимум 8 символов').regex(strongPasswordRegex, {
      message:
        'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву, цифру и специальный символ',
    }),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
      })
    }
  })

type FormData = z.infer<typeof schema>

export const RegisterForm = () => {
  const [register] = useRegisterMutation()
  const {
    handleSubmit,
    register: registerInput,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { username, email, password } = data
    const result = await register({ username, email, password })

    if ('error' in result) {
      const { error } = result
      if (isFetchBaseQueryError(error) && isApiErrorBody(error.data)) {
        setError('root', { message: error.data.description })
      } else {
        setError('root', { message: 'Ошибка регистрации' })
      }
    }
  }
  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        type="text"
        placeholder="Введите имя пользователя"
        label="Юзернейм"
        {...registerInput('username')}
        error={errors.username}
      />
      <FormInput
        type="email"
        placeholder="Введите электронную почту"
        label="Электронная почта"
        {...registerInput('email')}
        error={errors.email}
      />
      <FormPassword
        placeholder="Введите пароль"
        label="Пароль"
        {...registerInput('password')}
        error={errors.password}
      />
      <FormPassword
        placeholder="Введите пароль"
        label="Подтвердить пароль"
        {...registerInput('confirmPassword')}
        error={errors.confirmPassword}
      />
      <button type="submit" disabled={isSubmitting}>
        Зарегестрироваться
      </button>
      {errors.root && <ErrorMessage text={errors.root.message} />}
    </form>
  )
}
