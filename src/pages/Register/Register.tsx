import { AuthCta } from '@/features/auth/ui/auth-cta'
import { RegisterForm } from '@/features/auth/ui/register-form'
import { AuthForm } from '@/widgets/auth-form/ui'

export const Register = () => {
  return (
    <AuthForm title="Регистрация" footer={<AuthCta type="login" />}>
      <RegisterForm />
    </AuthForm>
  )
}
