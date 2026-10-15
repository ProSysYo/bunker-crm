"use client";
import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";
import { routes } from "@/config/navigation";
import { deletePaint } from "../actions/delete-paint";
import { Paint } from "../paint-types";

const columns: ColumnDef<Paint>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

type Props = {
    items: Paint[];
};

export const PaintsTable = ({ items }: Props) => {
    return (
        <CatalogTable
            data={items}
            columns={columns}
            emptyContent="Покраски не найдены"
            ariaLabel="Таблица покрасок"
            onDelete={deletePaint}
            getEditHref={(item) => `${routes.paintsEdit}${item.id}`}
        />
    );
};