"use client"

import { LockForm } from "@/features/locks/ui/lock-form"
import { useRouter } from "next/navigation"

export default function NewLockPage() {
  const router = useRouter()
  const handleSuccess = () => {
    router.push("/locks")
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Добавить замок</h1>
          <p className="text-sm text-muted-foreground">
            Заполните данные для создания нового замка
          </p>
        </div>
        <LockForm onSuccess={handleSuccess} />
      </div>
    </div>
  )
}