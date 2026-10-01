"use client";
import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";
import { routes } from "@/config/navigation";
import { deleteEar } from "../actions/delete-ear";
import { Ear } from "../ear-types";

const columns: ColumnDef<Ear>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

type Props = {
    items: Ear[];
};

export const EarsTable = ({ items }: Props) => {
    return (
        <CatalogTable
            data={items}
            columns={columns}
            emptyContent="Ушки не найдены"
            ariaLabel="Таблица ушек"
            onDelete={deleteEar}
            getEditHref={(item) => `${routes.earsEdit}${item.id}`}
        />
    );
};