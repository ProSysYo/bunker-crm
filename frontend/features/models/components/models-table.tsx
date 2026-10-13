"use client";
import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";
import { routes } from "@/config/navigation";
import { deleteModel } from "../actions/delete-model";
import { Model } from "../model-types";

const columns: ColumnDef<Model>[] = [
    { key: "code", label: "Код", render: (item) => item.code },
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

type Props = {
    items: Model[];
};

export const ModelsTable = ({ items }: Props) => {
    return (
        <CatalogTable
            data={items}
            columns={columns}
            emptyContent="Модели не найдены"
            ariaLabel="Таблица моделей"
            onDelete={deleteModel}
            getEditHref={(item) => `${routes.modelsEdit}${item.id}`}
        />
    );
};