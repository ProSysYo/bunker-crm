"use client";

import React, { useActionState, useEffect } from "react";
import { Autocomplete, AutocompleteItem, Button, Input } from "@heroui/react";
import { createLock, updateLock } from "../actions";
import { TLockType } from "../types/TLockType";

interface ModelFormProps {
    onSuccess?: () => void;
    editId?: string;
    initialValues?: { [key: string]: unknown } | null;
}

const initialState = {
    success: false,
    error: "",
};

const types: TLockType[] = ["цилиндр", "сувальда", "цилиндр + сувальда", "сувальда + цилиндр"];

export const LockForm = ({ onSuccess, editId, initialValues }: ModelFormProps) => {
    const action = editId ? updateLock : createLock;
    const [state, formAction, isPending] = useActionState(action, initialState);

    useEffect(() => {
        if (state.success) {
            onSuccess?.();
        }
    }, [state.success, onSuccess]);

    return (
        <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
            {editId && <input type="hidden" name="id" value={editId} />}

            <div className="flex flex-col gap-1">
                <Input
                    name="name"
                    label="Название замка"
                    placeholder="Введите название замка"
                    isRequired
                    defaultValue={initialValues?.name ? String(initialValues.name) : undefined}
                />
            </div>

            <div className="flex flex-col gap-1">
                <Autocomplete
                    name="type"
                    label="Тип замка"
                    placeholder="Выберите тип замка"
                    isRequired
                    defaultItems={types.map((item) => {
                        return { label: item, key: item };
                    })}
                    defaultInputValue={initialValues?.type ? String(initialValues.type) : undefined}
                >
                    {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                </Autocomplete>
            </div>

            {state?.error && <p className="text-sm text-danger">{state.error}</p>}

            <Button type="submit" variant="flat" disabled={isPending}>
                {isPending ? "Сохранение..." : "Сохранить"}
            </Button>
        </form>
    );
};
