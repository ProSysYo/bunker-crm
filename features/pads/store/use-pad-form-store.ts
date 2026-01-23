"use client";

import { create } from "zustand";
import { padFormSchema, PadFormValues } from "../model/schema";
import { createPad } from "../actions/create-pad";
import { updatePad } from "../actions/update-pad";

type PadFormState = {
    values: PadFormValues;
    errors: Partial<Record<keyof PadFormValues, string>>;
    loading: boolean;
    serverError?: string;
    setField: <K extends keyof PadFormValues>(field: K, value: PadFormValues[K]) => void;
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

export const usePadFormStore = create<PadFormState>((set, get) => ({
    values: {
        name: "",
        type: "",
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
        const result = padFormSchema.safeParse(values);

        if (!result.success) {
            const fieldErrors: PadFormState["errors"] = {};
            for (const issue of result.error.issues) {
                const path = issue.path[0] as keyof PadFormValues | undefined;
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
            const response = await createPad(null, formData);

            if (!response?.success) {
                set({ serverError: response?.error || "Не удалось создать" });
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
        const result = padFormSchema.safeParse(values);

        if (!result.success) {
            const fieldErrors: PadFormState["errors"] = {};
            for (const issue of result.error.issues) {
                const path = issue.path[0] as keyof PadFormValues | undefined;
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
            const response = await updatePad(null, formData);

            if (!response?.success) {
                set({ serverError: response?.error || "Не удалось обновить" });
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
