"use client";
import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";
import { routes } from "@/config/navigation";
import { deleteCustomer } from "../actions/delete-customer";
import { Customer } from "../customer-types";

const columns: ColumnDef<Customer>[] = [
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
    items: Customer[];
};

export const CustomersTable = ({ items }: Props) => {
    return (
        <CatalogTable
            data={items}
            columns={columns}
            emptyContent="Клиенты не найдены"
            ariaLabel="Таблица клиентов"
            onDelete={deleteCustomer}
            getEditHref={(item) => `${routes.customersEdit}${item.id}`}
        />
    );
};