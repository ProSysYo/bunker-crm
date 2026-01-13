"use client"

import React, { useActionState, useEffect } from "react"
import { Button, Input, Switch, Textarea } from "@heroui/react"
import { createDoorModel, updateDoorModelForm } from "@/features/model/actions/door-model"

interface ModelFormProps {
  onSuccess?: () => void
  editId?: string
  initialValues?: { [key: string]: unknown } | null
}

const initialState = {
  success: false,
  error: "",
}

export const ModelForm = ({ onSuccess, editId, initialValues }: ModelFormProps) => {
  // Choose server action based on presence of editId
  const action = editId ? updateDoorModelForm : createDoorModel
  const [state, formAction, isPending] = useActionState(action, initialState)

  useEffect(() => {
    if (state.success) {
      onSuccess?.()
    }
  }, [state.success, onSuccess])

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
      {/* If editing, include hidden id */}
      {editId && <input type="hidden" name="id" value={editId} />}

      <div className="flex flex-col gap-1">
        <Input
          name="name"
          label="Название модели"
          placeholder="Введите название модели"
          isRequired
          defaultValue={initialValues?.name ? String(initialValues.name) : undefined}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Textarea
          name="description"
          label="Описание"
          placeholder="Введите описание модели"
          defaultValue={initialValues?.description ? String(initialValues.description) : undefined}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Textarea
          name="outside"
          label="Внешняя сторона"
          placeholder="Опишите внешнюю сторону двери"
          defaultValue={initialValues?.outside ? String(initialValues.outside) : undefined}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Textarea
          name="inside"
          label="Внутренняя сторона"
          placeholder="Опишите внутреннюю сторону двери"
          defaultValue={initialValues?.inside ? String(initialValues.inside) : undefined}
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch name="isDouble" defaultChecked={!!initialValues?.isDouble} />
        <span className="text-sm">Двойная дверь</span>
      </div>

      {state?.error && (
        <p className="text-sm text-danger">{state.error}</p>
      )}

      <Button type="submit" variant="flat" disabled={isPending}>
        {isPending ? "Сохранение..." : "Сохранить"}
      </Button>
    </form>
  )
}
