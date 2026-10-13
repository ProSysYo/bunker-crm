"use client";
import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { insideFinishFormSchema } from "../inside-finish-schema";
import { updateInsideFinish } from "../actions/update-inside-finish";
import { createInsideFinish } from "../actions/create-inside-finish";
import { InsideFinishCreate } from "../inside-finish-types";

interface InsideFinishFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string } | null;
}

export function InsideFinishForm({ onSuccess, editId, initialValues }: InsideFinishFormProps) {
    const isEdit = !!editId;

    const [values, setValues] = useState<InsideFinishCreate>({
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof InsideFinishCreate, string>>>({});
    const [loading, setLoading] = useState(false);

    const setField = <K extends keyof InsideFinishCreate>(field: K, value: InsideFinishCreate[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): InsideFinishCreate | null => {
        const result = insideFinishFormSchema.safeParse(values);
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
            ? await updateInsideFinish({ ...data, id: editId })
            : await createInsideFinish(data);

        if (response.errors) {
            setErrors(response.errors as Partial<Record<keyof InsideFinishCreate, string>>);
        }

        if (response.error) {
            toast.error(response.error);
        } else if (response.data) {
            toast.success(isEdit ? "Данные обновлены" : `Добавлена отделка: ${response.data.name}`);
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