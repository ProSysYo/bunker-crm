"use client";

import { Table } from "@heroui/react";
import React, { useState } from "react";
import ConfirmDialog from "@/shared/ui/confirm-dialog";
import { useRouter } from "next/navigation";
import { RowActions } from "./row-actions";

export type ColumnDef<T> = {
    key: keyof T | string;
    label: string;
    render?: (item: T) => React.ReactNode;
    widthClass?: string;
};

type Props<T> = {
    data: T[];
    columns: ColumnDef<T>[];
    emptyContent: string;
    ariaLabel: string;

    onDelete?: (id: number) => Promise<void>;
    getEditHref?: (item: T) => string;
};

export const CatalogTable = <T extends { id: number }>({
    data,
    columns,
    emptyContent,
    ariaLabel,
    onDelete,
    getEditHref,
}: Props<T>) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const handleDelete = async () => {
        if (confirmDeleteId === null || !onDelete) return;

        setDeletingId(confirmDeleteId);
        try {
            await onDelete(confirmDeleteId);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Не удалось удалить");
        } finally {
            setDeletingId(null);
            setConfirmDeleteId(null);
        }
    };

    const handleOpenConfirm = (id: number) => {
        if (!onDelete) return;
        setConfirmDeleteId(id);
    };

    const renderRowActions = (item: T) => {
        if (getEditHref && onDelete) {
            return (
                <RowActions
                    id={item.id}
                    editHref={getEditHref(item)}
                    onDelete={() => handleOpenConfirm(item.id)}
                    isLoading={deletingId === item.id}
                />
            );
        }

        return null;
    };

    return (
        <>
            <Table>
                <Table.ScrollContainer aria-label={ariaLabel}>
                    <Table.Content aria-label={ariaLabel}>
                        <Table.Header>
                            {columns.map((column, index) => (
                                <Table.Column key={String(column.key)} id={String(column.key)} className={column.widthClass} isRowHeader={index === 0}>
                                    {column.label}
                                </Table.Column>
                            ))}
                        </Table.Header>
                        <Table.Body items={data}>
                            {(item) => (
                                <Table.Row key={item.id} id={String(item.id)}>
                                    {columns.map((col) => (
                                        <Table.Cell key={String(col.key)}>
                                            {col.render ? col.render(item) : renderRowActions(item)}
                                        </Table.Cell>
                                    ))}
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>

            <ConfirmDialog
                isOpen={confirmDeleteId !== null}
                onClose={() => setConfirmDeleteId(null)}
                onConfirm={handleDelete}
                title="Вы уверены?"
                confirmText="Удалить"
                cancelText="Отмена"
            >
                Это действие нельзя отменить. Вы действительно хотите удалить эту запись?
            </ConfirmDialog>
        </>
    );
};
