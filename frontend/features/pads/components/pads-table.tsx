"use client";

import { routes } from "@/config/navigation";
import { Pad } from "../types/Pad";
import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";
import { padTypeLabels } from "../types/PadType";
import { deletePad } from "../actions/delete-pad";

type Props = {
    pads: Pad[];
};

const padColumns: ColumnDef<Pad>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    { key: "type", label: "Тип", render: (item) => padTypeLabels[item.type] ?? item.type  },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: 'w-1' },
];

export const PadsTable = ({ pads }: Props) => {
    return (
        <CatalogTable
            data={pads}
            columns={padColumns}
            emptyContent="Накладки не найдены"
            ariaLabel="Таблица накладок"
            onDelete={deletePad}
            getEditHref={(item) => `${routes.padsEdit}${item.id}`}
        />
    );
};
