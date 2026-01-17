"use client";

import { create } from "zustand";
import { loginSchema, type LoginFormValues } from "../model/schema";
import { signInWithCredentials } from "../actions/login";
import { routes } from "@/config/navigation";

type LoginState = {
    values: LoginFormValues;
    errors: Partial<Record<keyof LoginFormValues, string>>;
    loading: boolean;
    serverError?: string;
    setField: <K extends keyof LoginFormValues>(field: K, value: LoginFormValues[K]) => void;
    submit: () => Promise<void>;
};

export const useLoginStore = create<LoginState>((set, get) => ({
    values: {
        email: "m@mail.ru",
        password: "123456",
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
        const result = loginSchema.safeParse(values);

        if (!result.success) {
            const fieldErrors: LoginState["errors"] = {};

            for (const issue of result.error.issues) {
                const path = issue.path[0] as keyof LoginFormValues | undefined;
                if (path) {
                    fieldErrors[path] = issue.message;
                }
            }

            set({ errors: fieldErrors });
            return;
        }

        try {
            set({ loading: true, serverError: undefined });

            await signInWithCredentials(result.data.email, result.data.password);

            window.location.href = routes.home;
        } catch {
            set({ serverError: "Произошла ошибка при входе" });
        } finally {
            set({ loading: false });
        }
    },
}));
