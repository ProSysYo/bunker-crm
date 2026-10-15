"use client";
import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";
import { routes } from "@/config/navigation";
import { deleteHinge } from "../actions/delete-hinge";
import { Hinge } from "../hinge-types";

const columns: ColumnDef<Hinge>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

type Props = {
    items: Hinge[];
};

export const HingesTable = ({ items }: Props) => {
    return (
        <CatalogTable
            data={items}
            columns={columns}
            emptyContent="Петли не найдены"
            ariaLabel="Таблица петель"
            onDelete={deleteHinge}
            getEditHref={(item) => `${routes.hingesEdit}${item.id}`}
        />
    );
};