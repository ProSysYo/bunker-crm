"use client"


import { PadForm } from "@/features/pads/ui/components/pad-form"
import { useRouter } from "next/navigation"

export default function PadNew() {
  const router = useRouter()
  const handleSuccess = () => {
    router.push("/pads")
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Добавить накладку</h1>
          <p className="text-sm text-muted-foreground">
            Заполните данные для создания новой накладки
          </p>
        </div>
        <PadForm onSuccess={handleSuccess} />
      </div>
    </div>
  )
}