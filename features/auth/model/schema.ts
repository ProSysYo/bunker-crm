import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
})

export const registerSchema = z.object({
  email: z.string().email("Некорректный email"),
  name: z.string().min(2, "Минимум 2 символа"),
  password: z.string().min(6, "Минимум 6 символов"),
  confirmPassword: z.string().min(6, "Минимум 6 символов"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>

