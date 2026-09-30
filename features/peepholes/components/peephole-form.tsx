"use client";
import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { peepholeFormSchema } from "../peephole-schema";
import { updatePeephole } from "../actions/update-peephole";
import { createPeephole } from "../actions/create-peephole";
import { PeepholeCreate } from "../peephole-types";

interface PeepholeFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string } | null;
}

export function PeepholeForm({ onSuccess, editId, initialValues }: PeepholeFormProps) {
    const isEdit = !!editId;

    const [values, setValues] = useState<PeepholeCreate>({
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof PeepholeCreate, string>>>({});
    const [loading, setLoading] = useState(false);

    const setField = <K extends keyof PeepholeCreate>(field: K, value: PeepholeCreate[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): PeepholeCreate | null => {
        const result = peepholeFormSchema.safeParse(values);
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
            ? await updatePeephole({ ...data, id: editId })
            : await createPeephole(data);

        if (response.errors) {
            setErrors(response.errors as Partial<Record<keyof PeepholeCreate, string>>);
        }

        if (response.error) {
            toast.error(response.error);
        } else if (response.data) {
            toast.success(isEdit ? "Данные обновлены" : `Добавлен глазок: ${response.data.name}`);
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