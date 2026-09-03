"use client";

import { TLock } from "../../types/TLock";
import { routes } from "@/config/navigation";

import { deleteLock } from "../../actions/delete-lock";
import { CatalogTable, ColumnDef } from "@/shared/ui/table/catalog-table/catalog-table";
import { lockTypeLabels } from "../../types/TLockType";

const lockColumns: ColumnDef<TLock>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    { key: "type", label: "Тип", render: (item) => lockTypeLabels[item.type] ?? item.type },
    {
        key: "createdAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", widthClass: "w-1" },
];

type Props = {
    locks: TLock[];
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
