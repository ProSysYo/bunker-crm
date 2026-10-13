"use client";

import { Lock } from "../types/Lock";
import { routes } from "@/config/navigation";

import { deleteLock } from "../actions/delete-lock";
import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";
import { lockTypeLabels } from "../types/LockType";

const lockColumns: ColumnDef<Lock>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    { key: "type", label: "Тип", render: (item) => lockTypeLabels[item.type] ?? item.type },
    {
        key: "createdAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

type Props = {
    locks: Lock[];
};

export const LocksTable = ({ locks }: Props) => {
    return (
        <CatalogTable
            data={locks}
            columns={lockColumns}
            emptyContent="Замки не найдены"
            ariaLabel="Таблица замков"
            onDelete={deleteLock}
            getEditHref={(item) => `${routes.locksEdit}${item.id}`}
        />
    );
};
