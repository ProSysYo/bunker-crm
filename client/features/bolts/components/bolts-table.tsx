"use client";

import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";

import { routes } from "@/config/navigation";
import { deleteBolt } from "../actions/delete-bolt";
import { Bolt } from "../bolt-types";

const columns: ColumnDef<Bolt>[] = [
    { key: "name", label: "Название", render: (item) => item.name },

    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

type Props = {
    items: Bolt[];
};

export const BoltsTable = ({ items }: Props) => {
    return (
        <CatalogTable
            data={items}
            columns={columns}
            emptyContent="Ручки не найдены"
            ariaLabel="Таблица ручек"
            onDelete={deleteBolt}
            getEditHref={(item) => `${routes.boltsEdit}${item.id}`}
        />
    );
};
