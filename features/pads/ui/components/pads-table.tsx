"use client";

import { deleteLock } from "../../actions";
import { routes } from "@/config/navigation";
import { TPadFull } from "../../types/TPad";
import { CatalogTable, ColumnDef } from "@/shared/ui/table/catalog-table/catalog-table";
import { padTypeLabels } from "../../types/TPadType";

type Props = {
    pads: TPadFull[];
};

const padColumns: ColumnDef<TPadFull>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    { key: "type", label: "Тип", render: (item) => padTypeLabels[item.type] ?? item.type  },
    {
        key: "createdAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", widthClass: 'w-1' },
];

export const PadsTable = ({ pads }: Props) => {
    return (
        <CatalogTable
            data={pads}
            columns={padColumns}
            emptyContent="Замки не найдены"
            ariaLabel="Таблица замков"
            onDelete={deleteLock}
            getEditHref={(item) => `${routes.padsEdit}${item.id}`}
        />
    );
};
