"use client";
import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";
import { routes } from "@/config/navigation";
import { deletePeephole } from "../actions/delete-peephole";
import { Peephole } from "../peephole-types";

const columns: ColumnDef<Peephole>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

type Props = {
    items: Peephole[];
};

export const PeepholesTable = ({ items }: Props) => {
    return (
        <CatalogTable
            data={items}
            columns={columns}
            emptyContent="Глазки не найдены"
            ariaLabel="Таблица глазков"
            onDelete={deletePeephole}
            getEditHref={(item) => `${routes.peepholesEdit}${item.id}`}
        />
    );
};