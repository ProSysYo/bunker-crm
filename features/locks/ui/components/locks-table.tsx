"use client";

import { TLockFull } from "../../types/TLock";
import { routes } from "@/config/navigation";

import { deleteLock } from "../../actions/delete-lock";
import { CatalogTable, ColumnDef } from "@/shared/ui/table/catalog-table/catalog-table";

const lockColumns: ColumnDef<TLockFull>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    { key: "type", label: "Тип", render: (item) => item.type },
    {
        key: "createdAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", widthClass: "w-1" },
];

type Props = {
    locks: TLockFull[];
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
