import { AuthCta } from '@/features/auth/ui/auth-cta'
import { LoginForm } from '@/features/auth/ui/login-form'
import { AuthForm } from '@/widgets/auth-form/ui'

export const Login = () => {
  return (
    <AuthForm title="Вход в личный кабинет" footer={<AuthCta type="register" />}>
      <LoginForm />
    </AuthForm>
  )
}
