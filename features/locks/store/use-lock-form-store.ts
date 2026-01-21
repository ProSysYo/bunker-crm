// features/locks/lib/useLockFormStore.ts
"use client";

import { create } from "zustand";
import { lockFormSchema, type LockFormValues } from "../model/schema";
import { createLock, updateLock } from "../actions";
import { TLockType } from "../types/TLockType";

type LockFormState = {
    values: LockFormValues;
    errors: Partial<Record<keyof LockFormValues, string>>;
    loading: boolean;
    serverError?: string;
    setField: <K extends keyof LockFormValues>(field: K, value: LockFormValues[K]) => void;
    submitCreate: (onSuccess?: () => void) => Promise<void>;
    submitUpdate: (id: number, onSuccess?: () => void) => Promise<void>;
    reset: () => void;
};

const objectToFormData = (obj: Record<string, string | number>) => {
    const fd = new FormData();
    for (const [key, value] of Object.entries(obj)) {
        fd.append(key, String(value));
    }
    return fd;
};

export const useLockFormStore = create<LockFormState>((set, get) => ({
    values: {
        name: "",
        type: "" as TLockType,
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

    submitCreate: async (onSuccess) => {
        const { values } = get();
        const result = lockFormSchema.safeParse(values);

        if (!result.success) {
            const fieldErrors: LockFormState["errors"] = {};
            for (const issue of result.error.issues) {
                const path = issue.path[0] as keyof LockFormValues | undefined;
                if (path) {
                    fieldErrors[path] = issue.message;
                }
            }
            set({ errors: fieldErrors });
            return;
        }

        try {
            set({ loading: true, serverError: undefined });
            const formData = objectToFormData(result.data);
            const response = await createLock(null, formData);

            if (!response?.success) {
                set({ serverError: response?.error || "Не удалось создать замок" });
                return;
            }

            set({ errors: {}, serverError: undefined });
            onSuccess?.();
        } catch (err) {
            set({ serverError: "Произошла ошибка при создании" });
        } finally {
            set({ loading: false });
        }
    },

    submitUpdate: async (id, onSuccess) => {
        const { values } = get();
        const result = lockFormSchema.safeParse(values);

        if (!result.success) {
            const fieldErrors: LockFormState["errors"] = {};
            for (const issue of result.error.issues) {
                const path = issue.path[0] as keyof LockFormValues | undefined;
                if (path) {
                    fieldErrors[path] = issue.message;
                }
            }
            set({ errors: fieldErrors });
            return;
        }

        try {
            set({ loading: true, serverError: undefined });
            const formData = objectToFormData({
                id,
                name: result.data.name,
                type: result.data.type,
            });
            const response = await updateLock(null, formData);

            if (!response?.success) {
                set({ serverError: response?.error || "Не удалось обновить замок" });
                return;
            }

            set({ errors: {}, serverError: undefined });
            onSuccess?.();
        } catch (err) {
            set({ serverError: "Произошла ошибка при обновлении" });
        } finally {
            set({ loading: false });
        }
    },

    reset: () => {
        set({
            values: { name: "", type: "" },
            errors: {},
            serverError: undefined,
            loading: false,
        });
    },
}));
