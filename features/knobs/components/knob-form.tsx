"use client";

import { useState } from "react";
import { knobFormSchema, KnobFormValues } from "../model/knob-schema";
import { createKnob } from "../actions/create-knob";
import { updateKnob } from "../actions/update-knob";
import { Button } from "@/shared/ui/shadcn/button";
import { InputField } from "@/shared/ui/input-field";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";

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

    const [loading, setLoading] = useState(false);

    const setField = <K extends keyof KnobFormValues>(field: K, value: KnobFormValues[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));

        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): KnobFormValues | null => {
        const result = knobFormSchema.safeParse(values);

        if (!result.success) {
            setErrors(parseZodErrors(result.error));
            return null;
        }

        setErrors({});
        return result.data;
    };

    const handleSubmit = async () => {
        const data = validate();
        if (!data) return;

        setLoading(true);

        const response = isEdit ? await updateKnob({ ...data, id: editId }) : await createKnob(data);

        if (response.errors) {
            setErrors(response.errors as Partial<Record<keyof KnobFormValues, string>>);
        }

        if (response.error) {
            toast.error(response.error);
        } else if (response.data) {
            toast.success(isEdit ? "Данные обновлены" : `Добавлена ручка: ${response.data.name}`);
            onSuccess?.();
        }

        setLoading(false);
    };

    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            <InputField
                id="name"
                label="Название"
                value={values.name}
                placeholder="Введите название"
                error={errors.name}
                type="text"
                onChange={(e) => setField("name", e.target.value)}
            />

            <Button onClick={handleSubmit}>{loading ? "Сохранение..." : editId ? "Обновить" : "Создать"}</Button>
        </div>
    );
}
