"use client";
import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { packagingFormSchema } from "../packaging-schema";
import { updatePackaging } from "../actions/update-packaging";
import { createPackaging } from "../actions/create-packaging";
import { PackagingCreate } from "../packaging-types";

interface PackagingFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string } | null;
}

export function PackagingForm({ onSuccess, editId, initialValues }: PackagingFormProps) {
    const isEdit = !!editId;

    const [values, setValues] = useState<PackagingCreate>({
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof PackagingCreate, string>>>({});
    const [loading, setLoading] = useState(false);

    const setField = <K extends keyof PackagingCreate>(field: K, value: PackagingCreate[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): PackagingCreate | null => {
        const result = packagingFormSchema.safeParse(values);
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
            ? await updatePackaging({ ...data, id: editId })
            : await createPackaging(data);

        if (response.errors) {
            setErrors(response.errors as Partial<Record<keyof PackagingCreate, string>>);
        }

        if (response.error) {
            toast.error(response.error);
        } else if (response.data) {
            toast.success(isEdit ? "Данные обновлены" : `Добавлена упаковка: ${response.data.name}`);
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