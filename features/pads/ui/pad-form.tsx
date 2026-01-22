"use client";

import { useEffect } from "react";
import { Autocomplete, AutocompleteItem, Button, Input } from "@heroui/react";

import { usePadFormStore } from "../store/use-pad-form-store";
import { TPadType } from "../types/TPadType";
import { padTypes } from "../data/pad-types";

interface LockFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string; type?: TPadType } | null;
}

export const PadForm = ({ onSuccess, editId, initialValues }: LockFormProps) => {
    const { values, errors, loading, serverError, setField, submitCreate, submitUpdate, reset } = usePadFormStore();

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
                label="Название накладки"
                placeholder="Введите название накладки"
                isRequired
                value={values.name}
                onValueChange={(v) => setField("name", v)}
                errorMessage={errors.name}
                isInvalid={!!errors.name}
            />

            <Autocomplete
                label="Тип накладки"
                placeholder="Выберите тип накладки"
                isRequired
                selectedKey={values.type || undefined}
                onSelectionChange={(key) => setField("type", key as TPadType)}
                defaultItems={padTypes.map((item) => ({ label: item.label, key: item.key }))}
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
