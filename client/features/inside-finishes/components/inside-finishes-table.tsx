"use client";
import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";
import { routes } from "@/config/navigation";
import { deleteInsideFinish } from "../actions/delete-inside-finish";
import { InsideFinish } from "../inside-finish-types";

const columns: ColumnDef<InsideFinish>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

type Props = {
    items: InsideFinish[];
};

export const InsideFinishesTable = ({ items }: Props) => {
    return (
        <CatalogTable
            data={items}
            columns={columns}
            emptyContent="Варианты отделки не найдены"
            ariaLabel="Таблица внутренней отделки"
            onDelete={deleteInsideFinish}
            getEditHref={(item) => `${routes.insideFinishesEdit}${item.id}`}
        />
    );
};