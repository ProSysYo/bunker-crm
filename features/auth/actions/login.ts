"use server"

import prisma from "@/lib/prisma"
import { loginSchema, type LoginFormValues } from "../model/schema"

export async function loginUser(
  data: LoginFormValues
): Promise<{ success: boolean; error?: string }> {
  try {
    const validated = loginSchema.parse(data)

    // Ищем пользователя
    const user = await prisma.user.findUnique({
      where: { email: validated.email },
    })

    if (!user) {
      return { success: false, error: "Неверный email или пароль" }
    }

    // Проверяем пароль (простое сравнение строк для тестирования)
    if (user.password !== validated.password) {
      return { success: false, error: "Неверный email или пароль" }
    }

    // TODO: Здесь будет установка сессии/cookie
    // Пока просто возвращаем успех, редирект делаем на клиенте
    return { success: true }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Произошла ошибка при входе" }
  }
}
