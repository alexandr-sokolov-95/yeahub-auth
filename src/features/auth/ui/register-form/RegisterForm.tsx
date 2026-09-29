import style from './style.module.css'
import { useForm, type SubmitHandler } from 'react-hook-form'
import {
  ErrorMessage,
  Form,
  FormCheckbox,
  FormInput,
  FormPassword,
  FormSubmit,
  Text,
} from '@/shared/ui'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation } from '../../api'
import { isApiErrorBody, isFetchBaseQueryError } from '@/shared/lib/api/error'
import { Link } from 'react-router'

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
    consent: z.literal(true, 'Необходимо согласие на обработку ПД'),
    agreement: z.literal(true, 'Необходимо согласие с договором-офертой'),
    ads: z.boolean().optional(),
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
    defaultValues: {
      consent: true,
      ads: true,
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { username, email, password } = data
    const result = await register({ username, email, password })

    if ('error' in result) {
      const { error } = result
      if (isFetchBaseQueryError(error) && isApiErrorBody(error.data)) {
        let message

        switch (error.status) {
          case 404:
            message = 'Произошла ошибка, попробуйте еще раз'
            break
          case 409:
            message = 'Пользователь с такими данными уже существует'
            break
          default:
            message = 'Ошибка регистрации'
            break
        }
        setError('root', { message: message })
      } else {
        setError('root', { message: 'Ошибка регистрации' })
      }
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
      <FormSubmit isLoading={isSubmitting} disabled={isSubmitting}>
        Зарегестрироваться
      </FormSubmit>
      <FormCheckbox error={errors.consent} {...registerInput('consent')}>
        <Text as="label" size={12}>
          Даю согласие на{' '}
          <Link to="#" className={style['consent-link']}>
            обработку ПД
          </Link>
          , в соответствии с{' '}
          <Link to="#" className={style['consent-link']}>
            Политикой в отношении ПД
          </Link>
        </Text>
      </FormCheckbox>
      <FormCheckbox error={errors.agreement} {...registerInput('agreement')}>
        <Text as="label" size={12}>
          Я подтверждаю что ознакомился(-ась) с Договором-офертой
        </Text>
      </FormCheckbox>
      <FormCheckbox {...registerInput('ads')}>
        <Text as="label" size={12}>
          Даю согласие на получение рекламных и информационных рассылок
        </Text>
      </FormCheckbox>
      {errors.root && <ErrorMessage text={errors.root.message} />}
    </Form>
  )
}
