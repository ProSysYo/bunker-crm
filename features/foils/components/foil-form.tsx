"use client";
import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { foilFormSchema } from "../foil-schema";
import { updateFoil } from "../actions/update-foil";
import { createFoil } from "../actions/create-foil";
import { FoilCreate } from "../foil-types";

interface FoilFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string } | null;
}

export function FoilForm({ onSuccess, editId, initialValues }: FoilFormProps) {
    const isEdit = !!editId;

    const [values, setValues] = useState<FoilCreate>({
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FoilCreate, string>>>({});
    const [loading, setLoading] = useState(false);

    const setField = <K extends keyof FoilCreate>(field: K, value: FoilCreate[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): FoilCreate | null => {
        const result = foilFormSchema.safeParse(values);
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
            ? await updateFoil({ ...data, id: editId })
            : await createFoil(data);

        if (response.errors) {
            setErrors(response.errors as Partial<Record<keyof FoilCreate, string>>);
        }

        if (response.error) {
            toast.error(response.error);
        } else if (response.data) {
            toast.success(isEdit ? "Данные обновлены" : `Добавлена пленка: ${response.data.name}`);
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