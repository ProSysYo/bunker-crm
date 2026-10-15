"use client";
import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { jambHoleFormSchema } from "../jamb-hole-schema";
import { updateJambHole } from "../actions/update-jamb-hole";
import { createJambHole } from "../actions/create-jamb-hole";
import { JambHoleCreate } from "../jamb-hole-types";

interface JambHoleFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string } | null;
}

export function JambHoleForm({ onSuccess, editId, initialValues }: JambHoleFormProps) {
    const isEdit = !!editId;

    const [values, setValues] = useState<JambHoleCreate>({
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof JambHoleCreate, string>>>({});
    const [loading, setLoading] = useState(false);

    const setField = <K extends keyof JambHoleCreate>(field: K, value: JambHoleCreate[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): JambHoleCreate | null => {
        const result = jambHoleFormSchema.safeParse(values);
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
            ? await updateJambHole({ ...data, id: editId })
            : await createJambHole(data);

        if (response.errors) {
            setErrors(response.errors as Partial<Record<keyof JambHoleCreate, string>>);
        }

        if (response.error) {
            toast.error(response.error);
        } else if (response.data) {
            toast.success(isEdit ? "Данные обновлены" : `Добавлено отверстие: ${response.data.name}`);
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