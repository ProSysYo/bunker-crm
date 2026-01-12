'use client'

import { create } from "zustand"
import { loginSchema, registerSchema, type LoginFormValues, type RegisterFormValues } from "./schema"
import { loginUser } from "../api/login"
import { registerUser } from "../api/register"

type LoginState = {
  values: LoginFormValues
  errors: Partial<Record<keyof LoginFormValues, string>>
  loading: boolean
  serverError?: string
  setField: <K extends keyof LoginFormValues>(
    field: K,
    value: LoginFormValues[K]
  ) => void
  submit: () => Promise<void>
}

export const useLoginStore = create<LoginState>((set, get) => ({
  values: {
    email: "",
    password: "",
  },
  errors: {},
  loading: false,
  serverError: undefined,
  setField: (field, value) =>
    set((state) => ({
      values: { ...state.values, [field]: value },
      errors: { ...state.errors, [field]: undefined },
      serverError: undefined,
    })),
  submit: async () => {
    const { values } = get()
    const result = loginSchema.safeParse(values)

    if (!result.success) {
      const fieldErrors: LoginState["errors"] = {}

      for (const issue of result.error.issues) {
        const path = issue.path[0] as keyof LoginFormValues | undefined
        if (path) {
          fieldErrors[path] = issue.message
        }
      }

      set({ errors: fieldErrors })
      return
    }

    try {
      set({ loading: true, serverError: undefined })

      const response = await loginUser(result.data)
      
      if (!response.success) {
        set({ serverError: response.error })
        return
      }

      // При успешном входе редирект на главную
      window.location.href = "/"
    } catch (error) {
      set({ serverError: "Произошла ошибка при входе" })
    } finally {
      set({ loading: false })
    }
  },
}))

type RegisterState = {
  values: RegisterFormValues
  errors: Partial<Record<keyof RegisterFormValues, string>>
  loading: boolean
  serverError?: string
  setField: <K extends keyof RegisterFormValues>(
    field: K,
    value: RegisterFormValues[K]
  ) => void
  submit: () => Promise<void>
}

export const useRegisterStore = create<RegisterState>((set, get) => ({
  values: {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  },
  errors: {},
  loading: false,
  serverError: undefined,
  setField: (field, value) =>
    set((state) => ({
      values: { ...state.values, [field]: value },
      errors: { ...state.errors, [field]: undefined },
      serverError: undefined,
    })),
  submit: async () => {
    const { values } = get()
    const result = registerSchema.safeParse(values)

    if (!result.success) {
      const fieldErrors: RegisterState["errors"] = {}

      for (const issue of result.error.issues) {
        const path = issue.path[0] as keyof RegisterFormValues | undefined
        if (path) {
          fieldErrors[path] = issue.message
        }
      }

      set({ errors: fieldErrors })
      return
    }

    try {
      set({ loading: true, serverError: undefined })

      const response = await registerUser(result.data)
      
      if (!response.success) {
        set({ serverError: response.error })
        return
      }

      // При успешной регистрации редирект на страницу логина
      window.location.href = "/login"
    } catch (error) {
      set({ serverError: "Произошла ошибка при регистрации" })
    } finally {
      set({ loading: false })
    }
  },
}))

