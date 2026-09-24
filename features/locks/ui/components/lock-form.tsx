"use client";

import { useEffect } from "react";

import { TLockType } from "../../types/TLockType";
import { useLockFormStore } from "../../store/use-lock-form-store";
import { lockTypes } from "@/features/locks/data/lock-types";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/shared/ui/shadcn/combobox";
import { Button } from "@/shared/ui/shadcn/button";
import { Field, FieldDescription, FieldLabel } from "@/shared/ui/shadcn/field";
import { Input } from "@/shared/ui/shadcn/input";

interface LockFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string; type?: TLockType | string } | null;
}

export const LockForm = ({ onSuccess, editId, initialValues }: LockFormProps) => {
    const { values, errors, loading, serverError, setField, submitCreate, submitUpdate, reset } = useLockFormStore();

    const selectedLockType = lockTypes.find((type) => type.value === values.type);
    const displayValue = selectedLockType?.label || "";

    useEffect(() => {
        if (initialValues) {
            setField("name", initialValues.name || "");
            setField("type", initialValues.type || "");
        }
    }, [initialValues, setField]);

    useEffect(() => {
        reset();
        if (initialValues) {
            setField("name", initialValues.name || "");
            setField("type", initialValues.type || "");
        }
    }, [reset, setField, initialValues]);

    const handleSubmit = () => {
        if (editId) {
            submitUpdate(editId, onSuccess);
        } else {
            submitCreate(onSuccess);
        }
    };
    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="name">Название замка</FieldLabel>
                <Input
                    id="name"
                    type="text"
                    required
                    placeholder="Введите название замка"
                    value={values.name}
                    aria-invalid={!!errors.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField("name", e.target.value)}
                />

                {errors.name && <FieldDescription>{errors.name}</FieldDescription>}
            </Field>

            <Field data-invalid={!!errors.type}>
                <FieldLabel htmlFor="type">Тип замка</FieldLabel>
                <Combobox
                    id="type"
                    items={lockTypes}
                    value={displayValue}
                    required
                    onValueChange={(key) => setField("type", (key ?? "") as TLockType)}
                >
                    <ComboboxInput placeholder="Выберите тип замка" aria-invalid={!!errors.type} />
                    <ComboboxContent>
                        <ComboboxEmpty>Ничего не найдено</ComboboxEmpty>
                        <ComboboxList>
                            {(i) => (
                                <ComboboxItem key={i.value} value={i.value}>
                                    {i.label}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
                {errors.type && <FieldDescription>{errors.type}</FieldDescription>}
            </Field>

            {serverError && <p className="text-sm text-danger">{serverError}</p>}

            <Button onClick={handleSubmit}>{loading ? "Сохранение..." : editId ? "Обновить" : "Создать"}</Button>
        </div>
    );
};
