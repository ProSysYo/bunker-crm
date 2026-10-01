"use client";
import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";
import { routes } from "@/config/navigation";
import { deletePackaging } from "../actions/delete-packaging";
import { Packaging } from "../packaging-types";

const columns: ColumnDef<Packaging>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

type Props = {
    items: Packaging[];
};

export const PackagingsTable = ({ items }: Props) => {
    return (
        <CatalogTable
            data={items}
            columns={columns}
            emptyContent="Упаковки не найдены"
            ariaLabel="Таблица упаковок"
            onDelete={deletePackaging}
            getEditHref={(item) => `${routes.packagingsEdit}${item.id}`}
        />
    );
};