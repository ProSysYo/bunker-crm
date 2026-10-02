"use client";
import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";
import { routes } from "@/config/navigation";
import { deleteFoil } from "../actions/delete-foil";
import { Foil } from "../foil-types";

const columns: ColumnDef<Foil>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

type Props = {
    items: Foil[];
};

export const FoilsTable = ({ items }: Props) => {
    return (
        <CatalogTable
            data={items}
            columns={columns}
            emptyContent="Пленки не найдены"
            ariaLabel="Таблица пленок"
            onDelete={deleteFoil}
            getEditHref={(item) => `${routes.foilsEdit}${item.id}`}
        />
    );
};