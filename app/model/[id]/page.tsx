import React from "react"
import EditModelClient from "./client"
import { getDoorModel } from "@/features/model/actions/door-model"

type Props = {
  params: { id: string }
}

export default async function EditModelPage({ params }: Props) {
  // Await dynamic param to ensure we pass a plain string to the client wrapper.
  const { id } = await params;
  console.log(id);
  

  // Fetch initial model on the server and pass it to the client to avoid client-side API calls.
  const model = await getDoorModel(id)

  if (!model) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
          <h2 className="text-lg font-semibold">Модель не найдена</h2>
          <p className="text-sm text-muted-foreground">Запрошенная модель не существует или был передан неверный ID.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Редактировать модель</h1>
          <p className="text-sm text-muted-foreground">Отредактируйте поля и сохраните изменения.</p>
        </div>
        {/* pass plain string and initial model to client wrapper */}
        <EditModelClient editId={id} initialValues={model} />
      </div>
    </div>
  )
}
