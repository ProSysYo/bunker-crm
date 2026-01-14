'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getDoorModels() {
  return prisma.doorModel.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export async function getDoorModel(id: string | undefined | null) {
  if (!id) return null

  return prisma.doorModel.findUnique({
    where: { id },
  })
}

export async function createDoorModel(prevState: unknown, formData: FormData) {
  try {
    const model = await prisma.doorModel.create({
      data: {
        name: formData.get("name") as string,
        description: (formData.get("description") as string) || null,
        outside: (formData.get("outside") as string) || null,
        inside: (formData.get("inside") as string) || null,
        isDouble: formData.get("isDouble") === "on",
      },
    })
    revalidatePath("/model")
    return { success: true, data: model }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Ошибка создания" }
  }
}

export async function updateDoorModelForm(prevState: unknown, formData: FormData) {
  try {
    const id = (formData.get("id") as string) || ""
    if (!id) {
      return { success: false, error: "ID is required" }
    }
    const data = {
      name: (formData.get("name") as string) || undefined,
      description: (formData.get("description") as string) || null,
      outside: (formData.get("outside") as string) || null,
      inside: (formData.get("inside") as string) || null,
      isDouble: formData.get("isDouble") === "on",
    }

    const model = await prisma.doorModel.update({
      where: { id },
      data,
    })

    revalidatePath("/model")
    return { success: true, data: model }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Ошибка обновления" }
  }
}

export async function deleteDoorModel(id: string) {
  if (!id) {
    throw new Error("deleteDoorModel: id is required")
  }

  await prisma.doorModel.delete({
    where: { id },
  })
  revalidatePath("/model")
}
