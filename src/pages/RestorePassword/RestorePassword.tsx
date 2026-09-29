import { AuthCta } from '@/features/auth/ui/auth-cta'
import { RestorePasswordForm } from '@/features/auth/ui/restore-password-form'
import { AuthForm } from '@/widgets/auth-form/ui'

export const RestorePassword = () => {
  return (
    <AuthForm title="Забыли пароль?" footer={<AuthCta type="register" />}>
      <RestorePasswordForm />
    </AuthForm>
  )
}
