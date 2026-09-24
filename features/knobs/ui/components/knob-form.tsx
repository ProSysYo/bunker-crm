"use client";

import { useState, useEffect } from "react";

import { knobFormSchema, KnobFormValues } from "../../model/knob-schema";
import { createKnob } from "../../actions/create-knob";
import { updateKnob } from "../../actions/update-knob";
import { Field, FieldDescription, FieldLabel } from "@/shared/ui/shadcn/field";
import { Input } from "@/shared/ui/shadcn/input";
import { Button } from "@/shared/ui/shadcn/button";

interface KnobFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string } | null;
}

export function KnobForm({ onSuccess, editId, initialValues }: KnobFormProps) {
    const isEdit = !!editId;

    const [values, setValues] = useState<KnobFormValues>({
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof KnobFormValues, string>>>({});
    const [serverError, setServerError] = useState<string>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setValues({
            name: initialValues?.name ?? "",
        });
        setErrors({});
        setServerError(undefined);
    }, [editId, initialValues]);

    const setField = <K extends keyof KnobFormValues>(field: K, value: KnobFormValues[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));

        setErrors((prev) => ({ ...prev, [field]: undefined }));
        setServerError(undefined);
    };

    const validate = (): KnobFormValues | null => {
        const result = knobFormSchema.safeParse(values);

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof KnobFormValues, string>> = {};
            for (const issue of result.error.issues) {
                const path = issue.path[0] as keyof KnobFormValues | undefined;
                if (path) {
                    fieldErrors[path] = issue.message;
                }
            }
            setErrors(fieldErrors);
            return null;
        }

        setErrors({});
        return result.data;
    };

    const handleSubmit = async () => {
        const data = validate();
        if (!data) return;

        setLoading(true);
        setServerError(undefined);

        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, String(value));
            });

            if (isEdit && editId) {
                formData.append("id", String(editId));
                const response = await updateKnob(null, formData);

                if (!response?.success) {
                    setServerError(response?.error || "Не удалось обновить ручку");
                    return;
                }

                //toast.success("Ручка обновлена");
            } else {
                const response = await createKnob(null, formData);

                if (!response?.success) {
                    setServerError(response?.error || "Не удалось создать ручку");
                    return;
                }

                //toast.success("Ручка создана");
            }

            onSuccess?.();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Произошла ошибка";
            setServerError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="name">Название ручки</FieldLabel>
                <Input
                    id="name"
                    type="text"
                    required
                    placeholder="Введите название ручки"
                    value={values.name}
                    aria-invalid={!!errors.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField("name", e.target.value)}
                />

                {errors.name && <FieldDescription>{errors.name}</FieldDescription>}
            </Field>

            {serverError && <p className="text-sm text-danger">{serverError}</p>}

            <Button onClick={handleSubmit}>{loading ? "Сохранение..." : editId ? "Обновить" : "Создать"}</Button>
        </div>
    );
}
