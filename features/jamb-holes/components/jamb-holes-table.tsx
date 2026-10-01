"use client";
import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";
import { routes } from "@/config/navigation";
import { deleteJambHole } from "../actions/delete-jamb-hole";
import { JambHole } from "../jamb-hole-types";

const columns: ColumnDef<JambHole>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

type Props = {
    items: JambHole[];
};

export const JambHolesTable = ({ items }: Props) => {
    return (
        <CatalogTable
            data={items}
            columns={columns}
            emptyContent="Отверстия не найдены"
            ariaLabel="Таблица отверстий"
            onDelete={deleteJambHole}
            getEditHref={(item) => `${routes.jambHolesEdit}${item.id}`}
        />
    );
};