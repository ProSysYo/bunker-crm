"use client";
import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";
import { routes } from "@/config/navigation";
import { deleteOutsideFinish } from "../actions/delete-outside-finish";
import { OutsideFinish } from "../outside-finish-types";

const columns: ColumnDef<OutsideFinish>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

type Props = {
    items: OutsideFinish[];
};

export const OutsideFinishesTable = ({ items }: Props) => {
    return (
        <CatalogTable
            data={items}
            columns={columns}
            emptyContent="Варианты отделки не найдены"
            ariaLabel="Таблица наружной отделки"
            onDelete={deleteOutsideFinish}
            getEditHref={(item) => `${routes.outsideFinishesEdit}${item.id}`}
        />
    );
};