"use client";
import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { customerFormSchema } from "../customer-schema";
import { updateCustomer } from "../actions/update-customer";
import { createCustomer } from "../actions/create-customer";
import { CustomerCreate } from "../customer-types";

interface CustomerFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { code?: string; name?: string } | null;
}

export function CustomerForm({ onSuccess, editId, initialValues }: CustomerFormProps) {
    const isEdit = !!editId;

    const [values, setValues] = useState<CustomerCreate>({
        code: initialValues?.code ?? "",
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof CustomerCreate, string>>>({});
    const [loading, setLoading] = useState(false);

    const setField = <K extends keyof CustomerCreate>(field: K, value: CustomerCreate[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): CustomerCreate | null => {
        const result = customerFormSchema.safeParse(values);
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
            ? await updateCustomer({ ...data, id: editId })
            : await createCustomer(data);

        if (response.errors) {
            setErrors(response.errors as Partial<Record<keyof CustomerCreate, string>>);
        }

        if (response.error) {
            toast.error(response.error);
        } else if (response.data) {
            toast.success(isEdit ? "Данные обновлены" : `Добавлен клиент: ${response.data.name}`);
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
                placeholder="Введите код"
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