"use client";

import { create } from "zustand";
import { registerSchema, type RegisterFormValues } from "../model/schema";
import { registerUser } from "../actions/register";
import { routes } from "@/config/navigation";

type RegisterState = {
    values: RegisterFormValues;
    errors: Partial<Record<keyof RegisterFormValues, string>>;
    loading: boolean;
    serverError?: string;
    setField: <K extends keyof RegisterFormValues>(field: K, value: RegisterFormValues[K]) => void;
    submit: () => Promise<void>;
};

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
        const { values } = get();
        const result = registerSchema.safeParse(values);

        if (!result.success) {
            const fieldErrors: RegisterState["errors"] = {};

            for (const issue of result.error.issues) {
                const path = issue.path[0] as keyof RegisterFormValues | undefined;
                if (path) {
                    fieldErrors[path] = issue.message;
                }
            }

            set({ errors: fieldErrors });
            return;
        }

        try {
            set({ loading: true, serverError: undefined });

            const response = await registerUser(result.data);

            if (!response.success) {
                set({ serverError: response.error });
                return;
            }

            window.location.href = routes.login;
        } catch {
            set({ serverError: "Произошла ошибка при регистрации" });
        } finally {
            set({ loading: false });
        }
    },
}));
