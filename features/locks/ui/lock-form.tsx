"use client";

import { useEffect } from "react";
import { Autocomplete, AutocompleteItem, Button, Input } from "@heroui/react";

import { TLockType } from "../types/TLockType";
import { useLockFormStore } from "../store/use-lock-form-store";
import { lockTypes } from "@/config/lock-types";

interface LockFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string; type?: TLockType | string } | null;
}

export const LockForm = ({ onSuccess, editId, initialValues }: LockFormProps) => {
    const { values, errors, loading, serverError, setField, submitCreate, submitUpdate, reset } = useLockFormStore();

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
            <Input
                label="Название замка"
                placeholder="Введите название замка"
                isRequired
                value={values.name}
                onValueChange={(v) => setField("name", v)}
                errorMessage={errors.name}
                isInvalid={!!errors.name}
            />

            <Autocomplete
                label="Тип замка"
                placeholder="Выберите тип замка"
                isRequired
                selectedKey={values.type || undefined}
                onSelectionChange={(key) => setField("type", key as TLockType)}
                defaultItems={lockTypes.map((item) => ({ label: item, key: item }))}
                errorMessage={errors.type}
                onClear={() => setField("type", "")}
                isInvalid={!!errors.type}
            >
                {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
            </Autocomplete>

            {serverError && <p className="text-sm text-danger">{serverError}</p>}

            <Button variant="flat" isLoading={loading} disabled={loading} onPress={handleSubmit}>
                {loading ? "Сохранение..." : editId ? "Обновить" : "Создать"}
            </Button>
        </div>
    );
};
