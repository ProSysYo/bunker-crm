"use client";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
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
            <Table aria-label={ariaLabel}>
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={String(column.key)} className={column.widthClass}>
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={emptyContent} items={data}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {columns.map((col) => (
                                <TableCell key={String(col.key)}>
                                    {col.render ? col.render(item) : renderRowActions(item)}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
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
