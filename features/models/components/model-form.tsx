"use client";
import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { modelFormSchema } from "../model-schema";
import { updateModel } from "../actions/update-model";
import { createModel } from "../actions/create-model";
import { ModelCreate } from "../model-types";

interface ModelFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { code?: string; name?: string } | null;
}

export function ModelForm({ onSuccess, editId, initialValues }: ModelFormProps) {
    const isEdit = !!editId;

    const [values, setValues] = useState<ModelCreate>({
        code: initialValues?.code ?? "",
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ModelCreate, string>>>({});
    const [loading, setLoading] = useState(false);

    const setField = <K extends keyof ModelCreate>(field: K, value: ModelCreate[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): ModelCreate | null => {
        const result = modelFormSchema.safeParse(values);
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

        const response = isEdit
            ? await updateModel({ ...data, id: editId })
            : await createModel(data);

        if (response.errors) {
            setErrors(response.errors as Partial<Record<keyof ModelCreate, string>>);
        }

        if (response.error) {
            toast.error(response.error);
        } else if (response.data) {
            toast.success(isEdit ? "Данные обновлены" : `Добавлена модель: ${response.data.name}`);
            onSuccess?.();
        }

        setLoading(false);
    };

    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            <InputField
                id="code"
                label="Код"
                value={values.code}
                placeholder="Введите код модели"
                error={errors.code}
                type="text"
                onChange={(e) => setField("code", e.target.value)}
            />
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