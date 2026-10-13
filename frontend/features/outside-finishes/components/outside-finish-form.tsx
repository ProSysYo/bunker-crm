"use client";
import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { outsideFinishFormSchema } from "../outside-finish-schema";
import { updateOutsideFinish } from "../actions/update-outside-finish";
import { createOutsideFinish } from "../actions/create-outside-finish";
import { OutsideFinishCreate } from "../outside-finish-types";

interface OutsideFinishFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string } | null;
}

export function OutsideFinishForm({ onSuccess, editId, initialValues }: OutsideFinishFormProps) {
    const isEdit = !!editId;

    const [values, setValues] = useState<OutsideFinishCreate>({
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof OutsideFinishCreate, string>>>({});
    const [loading, setLoading] = useState(false);

    const setField = <K extends keyof OutsideFinishCreate>(field: K, value: OutsideFinishCreate[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): OutsideFinishCreate | null => {
        const result = outsideFinishFormSchema.safeParse(values);
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
            ? await updateOutsideFinish({ ...data, id: editId })
            : await createOutsideFinish(data);

        if (response.errors) {
            setErrors(response.errors as Partial<Record<keyof OutsideFinishCreate, string>>);
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