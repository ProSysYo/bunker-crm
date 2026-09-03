"use client";

import { useEffect, useLayoutEffect } from "react";
import { Button, ComboBox, FieldError, Input, Label, ListBox, TextField } from "@heroui/react";

import { usePadFormStore } from "../../store/use-pad-form-store";
import { TPadType } from "../../types/TPadType";
import { padTypes } from "../../data/pad-types";

interface LockFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string; type?: TPadType } | null;
}

export const PadForm = ({ onSuccess, editId, initialValues }: LockFormProps) => {
    const { values, errors, loading, serverError, setField, submitCreate, submitUpdate, reset } = usePadFormStore();

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
            <TextField isRequired value={values.name} isInvalid={!!errors.name}>
                <Label>Название накладки</Label>
                <Input
                    placeholder="Введите название накладки"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField("name", e.target.value)}
                />
                {errors.name && <FieldError>{errors.name}</FieldError>}
            </TextField>

            <ComboBox
                defaultFilter={(text, inputValue) => text.toLowerCase().includes(inputValue.toLowerCase())}
                isRequired
                selectedKey={values.type || null}
                onSelectionChange={(key) => setField("type", key as TPadType)}
                items={padTypes}
                isInvalid={!!errors.type}
            >
                <Label>Тип накладки</Label>
                <ComboBox.InputGroup>
                    <Input placeholder="Выберите тип накладки" />
                    <ComboBox.Trigger />
                </ComboBox.InputGroup>
                <ComboBox.Popover>
                    <ListBox>
                        {(item: { key: TPadType; label: string }) => (
                            <ListBox.Item key={item.key} textValue={item.label}>
                                {item.label}
                            </ListBox.Item>
                        )}
                    </ListBox>
                </ComboBox.Popover>
            </ComboBox>

            {serverError && <p className="text-sm text-danger">{serverError}</p>}

            <Button variant="tertiary" isPending={loading} isDisabled={loading} onPress={handleSubmit}>
                {loading ? "Сохранение..." : editId ? "Обновить" : "Создать"}
            </Button>
        </div>
    );
};
