import { LoginForm } from "@/features/auth/ui/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Вход</h1>
          <p className="text-sm text-muted-foreground">
            Введите свои данные для входа в систему
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
