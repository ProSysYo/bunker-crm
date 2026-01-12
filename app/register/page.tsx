import { RegisterForm } from "@/features/auth/ui/register-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Регистрация</h1>
          <p className="text-sm text-muted-foreground">
            Создайте новый аккаунт для работы с системой
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
