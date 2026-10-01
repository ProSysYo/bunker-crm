"use client";
import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { hingeFormSchema } from "../hinge-schema";
import { updateHinge } from "../actions/update-hinge";
import { createHinge } from "../actions/create-hinge";
import { HingeCreate } from "../hinge-types";

interface HingeFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string } | null;
}

export function HingeForm({ onSuccess, editId, initialValues }: HingeFormProps) {
    const isEdit = !!editId;

    const [values, setValues] = useState<HingeCreate>({
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof HingeCreate, string>>>({});
    const [loading, setLoading] = useState(false);

    const setField = <K extends keyof HingeCreate>(field: K, value: HingeCreate[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): HingeCreate | null => {
        const result = hingeFormSchema.safeParse(values);
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
            ? await updateHinge({ ...data, id: editId })
            : await createHinge(data);

        if (response.errors) {
            setErrors(response.errors as Partial<Record<keyof HingeCreate, string>>);
        }

        if (response.error) {
            toast.error(response.error);
        } else if (response.data) {
            toast.success(isEdit ? "Данные обновлены" : `Добавлена петля: ${response.data.name}`);
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