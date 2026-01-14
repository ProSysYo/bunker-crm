"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { ModelForm } from "@/features/model/ui/model-form"

type Props = {
  editId: string
  initialValues?: { [key: string]: unknown } | null
}

export default function EditLockClient({ editId, initialValues }: Props) {
  const router = useRouter()
  const handleSuccess = () => router.push("/model")

  return <ModelForm onSuccess={handleSuccess} editId={editId} initialValues={initialValues ?? null} />
}
