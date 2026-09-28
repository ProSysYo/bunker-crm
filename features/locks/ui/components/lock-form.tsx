"use client";

import { useState } from "react";
import { TLockType } from "../../types/TLockType";
import { lockTypes } from "@/features/locks/data/lock-types";
import { Button } from "@/shared/ui/shadcn/button";
import { InputField } from "@/shared/ui/input-field";
import { ComboboxField } from "@/shared/ui/combobox-field";
import { lockFormSchema, LockFormValues } from "../../model/lock-schema";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { updateLock } from "../../actions/update-lock";
import { createLock } from "../../actions/create-lock";
import { toast } from "sonner";

interface LockFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string; type?: TLockType } | null;
}

export const LockForm = ({ onSuccess, editId, initialValues }: LockFormProps) => {
    const isEdit = !!editId;

    const [values, setValues] = useState<LockFormValues>({
        name: initialValues?.name ?? "",
        type: initialValues?.type ?? ("" as TLockType),
    });

    const [errors, setErrors] = useState<Partial<Record<keyof LockFormValues, string>>>({});

    const [loading, setLoading] = useState(false);

    const setField = <K extends keyof LockFormValues>(field: K, value: LockFormValues[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));

        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): LockFormValues | null => {
        const result = lockFormSchema.safeParse(values);

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

        const response = isEdit ? await updateLock({ ...data, id: editId }) : await createLock(data);

        if (response.errors) {
            setErrors(response.errors as Partial<Record<keyof LockFormValues, string>>);
        }

        if (response.error) {
            toast.error(response.error);
        } else if (response.data) {
            toast.success(isEdit ? "Данные обновлены" : `Добавлен замок: ${response.data.name}`);
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
                items={lockTypes}
                value={values.type}
                onValueChange={(v) => setField("type", v as TLockType)}
                error={errors.type}
                required
            />

            <Button disabled={loading} onClick={handleSubmit}>
                {loading ? "Сохранение..." : editId ? "Обновить" : "Создать"}
            </Button>
        </div>
    );
};
