"use client";

import { useEffect, useLayoutEffect } from "react";

import { usePadFormStore } from "../../store/use-pad-form-store";
import { TPadType } from "../../types/TPadType";
import { padTypes } from "../../data/pad-types";
import { Field, FieldDescription, FieldLabel } from "@/shared/ui/shadcn/field";
import { Input } from "@/shared/ui/shadcn/input";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/shared/ui/shadcn/combobox";
import { Button } from "@/shared/ui/shadcn/button";

interface LockFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string; type?: TPadType } | null;
}

export const PadForm = ({ onSuccess, editId, initialValues }: LockFormProps) => {
    const { values, errors, loading, serverError, setField, submitCreate, submitUpdate, reset } = usePadFormStore();

    const selectedPadType = padTypes.find((type) => type.value === values.type);
    const displayValue = selectedPadType?.label || "";

    useLayoutEffect(() => {
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
                <FieldLabel htmlFor="name">Название накладки</FieldLabel>
                <Input
                    id="name"
                    type="text"
                    required
                    placeholder="Введите название накладки"
                    value={values.name}
                    aria-invalid={!!errors.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField("name", e.target.value)}
                />

                {errors.name && <FieldDescription>{errors.name}</FieldDescription>}
            </Field>

            <Field data-invalid={!!errors.type}>
                <FieldLabel htmlFor="type">Тип накладки</FieldLabel>
                <Combobox
                    id="type"
                    items={padTypes}
                    value={displayValue}
                    required
                    onValueChange={(key) => setField("type", (key ?? "") as TPadType)}
                >
                    <ComboboxInput placeholder="Выберите тип накладки" aria-invalid={!!errors.type} />
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
