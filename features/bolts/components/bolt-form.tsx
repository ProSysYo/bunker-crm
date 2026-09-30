"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/shadcn/button";
import { InputField } from "@/shared/ui/input-field";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { BoltCreate } from "../types/Bolt";
import { boltFormSchema } from "../model/bolt-schema";
import { updateBolt } from "../actions/update-bolt";
import { createBolt } from "../actions/create-bolt";

interface KnobFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string } | null;
}

export function BoltForm({ onSuccess, editId, initialValues }: KnobFormProps) {
    const isEdit = !!editId;

    const [values, setValues] = useState<BoltCreate>({
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof BoltCreate, string>>>({});

    const [loading, setLoading] = useState(false);

    const setField = <K extends keyof BoltCreate>(field: K, value: BoltCreate[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));

        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): BoltCreate | null => {
        const result = boltFormSchema.safeParse(values);

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

        const response = isEdit ? await updateBolt({ ...data, id: editId }) : await createBolt(data);

        if (response.errors) {
            setErrors(response.errors as Partial<Record<keyof BoltCreate, string>>);
        }

        if (response.error) {
            toast.error(response.error);
        } else if (response.data) {
            toast.success(isEdit ? "Данные обновлены" : `Добавлен засов: ${response.data.name}`);
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
