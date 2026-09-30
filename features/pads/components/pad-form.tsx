"use client";

import { useState } from "react";
import { TPadType } from "../types/TPadType";
import { padTypes } from "../data/pad-types";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { ComboboxField } from "@/shared/components/combobox-field";
import { toast } from "sonner";
import { padFormSchema, PadFormValues } from "../model/pad-schema";
import { updatePad } from "../actions/update-pad";
import { createPad } from "../actions/create-pad";
import { parseZodErrors } from "@/shared/utils/zod-utils";

interface LockFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string; type?: TPadType } | null;
}

export const PadForm = ({ onSuccess, editId, initialValues }: LockFormProps) => {
    const isEdit = !!editId;

    const [values, setValues] = useState<PadFormValues>({
        name: initialValues?.name ?? "",
        type: initialValues?.type ?? ("" as TPadType),
    });

    const [errors, setErrors] = useState<Partial<Record<keyof PadFormValues, string>>>({});

    const [loading, setLoading] = useState(false);

    const setField = <K extends keyof PadFormValues>(field: K, value: PadFormValues[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));

        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): PadFormValues | null => {
        const result = padFormSchema.safeParse(values);

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

        const response = isEdit ? await updatePad({ ...data, id: editId }) : await createPad(data);

        if (response.errors) {
            setErrors(response.errors as Partial<Record<keyof PadFormValues, string>>);
        }

        if (response.error) {
            toast.error(response.error);
        } else if (response.data) {
            toast.success(isEdit ? "Данные обновлены" : `Добавлена накладка: ${response.data.name}`);
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

            <ComboboxField
                id="type"
                label="Тип"
                placeholder="Выберите тип"
                items={padTypes}
                value={values.type}
                onValueChange={(v) => setField("type", v as TPadType)}
                error={errors.type}
                required
            />

            <Button onClick={handleSubmit}>{loading ? "Сохранение..." : editId ? "Обновить" : "Создать"}</Button>
        </div>
    );
};
